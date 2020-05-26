using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using PrivateLessonsApp.Data;
using PrivateLessonsApp.Models;

namespace PrivateLessonsApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IConfiguration _configuration;
        private UserManager<User> _userManager;
        private RoleManager<IdentityRole> _roleManager;
        private DbContextOptions<AppDbContext> _db;
        public UserController(IConfiguration configuration, UserManager<User> userManager, RoleManager<IdentityRole> roleManager, DbContextOptions<AppDbContext> appDbContext)
        {
            _configuration = configuration;
            _userManager = userManager;
            _roleManager = roleManager;
            _db = appDbContext;

        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] User model)
        {
            if (model == null)
            {
                return new StatusCodeResult(500);
            }
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user != null)
            {
                return BadRequest("User name is busy");
            }
            var now = DateTime.UtcNow;

            user = new User
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.UserName,
                Email = model.Email,
                DisplayName = model.DisplayName

            };

            user.EmailConfirmed = true;
            user.LockoutEnabled = false;

            //string user_role = "User";

            await _userManager.CreateAsync(user, model.Password);

            //if(await _roleManager.RoleExistsAsync(user_role))
            //await _userManager.AddToRoleAsync(user, user_role);

            using (var db = new AppDbContext(_db))
            {
               await db.SaveChangesAsync();
            }

            return new JsonResult(user);

        }
                 
    }
}