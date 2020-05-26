using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Hanssens.Net;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PrivateLessonsApp.Data;
using PrivateLessonsApp.Models;
using PrivateLessonsApp.ViewModels;

namespace PrivateLessonsApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _configuration;
        private UserManager<User> _userManager;
        private RoleManager<IdentityRole> _roleManager;
        private AppDbContext _db;
        public LoginController(IConfiguration configuration, UserManager<User> userManager, RoleManager<IdentityRole> roleManager, AppDbContext appDbContext)
        {
            _configuration = configuration;
            _userManager = userManager;
            _roleManager = roleManager;
            _db = appDbContext;

        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]User login)
        {
            IActionResult respone = Unauthorized();
            var user = await AuthenticateUser(login);
            if (user != null)
            {
                var tokenString = GenerateJSONWebToken(user);
                respone = Ok(new { token = tokenString });
            }
            return respone;
        }
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

        public IActionResult Get()
        {
            User user = new User
            {
                DisplayName = "Koszyk"
            };
            return new JsonResult(user);
        }
        private TokenResponseViewModel GenerateJSONWebToken(User user)
        {
            DateTime now = DateTime.UtcNow;

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["AppSettings:Secret"]));

            var claims = new[] {

            new Claim(JwtRegisteredClaimNames.Sid, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName)     
            };

            var tokenExpirationMins = _configuration.GetValue<int>("AppSettings:Time");

            var token = new JwtSecurityToken(
                issuer: _configuration["AppSettings:Issuer"],
                audience: _configuration["AppSettings:Audience"],
                claims: claims,
                notBefore: now,
                expires: now.Add(TimeSpan.FromMinutes(tokenExpirationMins)),
                signingCredentials: new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256)
                );

            var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);


           
            return new TokenResponseViewModel()
            {
                Value = encodedToken,
                Expiration = tokenExpirationMins

            };
            
        }

        private async Task<User> AuthenticateUser(User login)
        {
            var user = await  _userManager.FindByNameAsync(login.UserName);

            if (user == null && login.UserName.Contains("@"))
                user =  await _userManager.FindByEmailAsync(login.Email);

            return user;
        }


        

    }
}