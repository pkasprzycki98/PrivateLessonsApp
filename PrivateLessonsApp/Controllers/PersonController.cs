using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PrivateLessonsApp.Models;
using PrivateLessonsApp.Services.Interfaces;

namespace PrivateLessonsApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonController : ControllerBase
    {
        private IPersonService _personService;
        private UserManager<User> _userManger;
        private IHttpContextAccessor _httpContextAccessor;

        public PersonController(IPersonService personService, UserManager<User> userManager, IHttpContextAccessor httpContextAccessor)
        {
            _personService = personService;
            _userManger = userManager;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            IList<Person> Persons;
            if (HttpContext.User.Identity.IsAuthenticated)
            {
                 Persons = await _personService.GetAllPersons();
            }
            else
            {
               Persons = new List<Person> { };
            }

            return new JsonResult(Persons);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {

            var Person = await _personService.GetPersonById(id);         
            return new JsonResult(Person);

        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] Person person)
        {

            var Username = _httpContextAccessor.HttpContext.User.Identity.Name;

            var User = await _userManger.FindByNameAsync(Username);
          


            person.UserId = User.Id;
            if (person == null)
            {
                return NotFound();

            }
            
            await _personService.CreatePerson(person);

            return new JsonResult(person);
        }      
        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put([FromBody] Person person)
        {
            

            if (person == null)
            {
                return NotFound();
            }
            var Username = _httpContextAccessor.HttpContext.User.Identity.Name;

            var User = await _userManger.FindByNameAsync(Username);

            person.UserId = User.Id;

            await _personService.UpdatePerson(person);

            return new JsonResult(person);
            
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int Id)
        {
            return new JsonResult(await _personService.DeletePerson(Id));
        }
    }
}