using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PrivateLessonsApp.Data;
using PrivateLessonsApp.Models;
using PrivateLessonsApp.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace PrivateLessonsApp.Services
{
	public class PersonService : IPersonService
	{
		private DbContextOptions<AppDbContext> _dbContextOptions;
		
		private IHttpContextAccessor _httpContextAccessor;
		public PersonService(DbContextOptions<AppDbContext> dbContextOptions, IHttpContextAccessor httpContextAccessor)
		{
			_dbContextOptions = dbContextOptions;
			_httpContextAccessor = httpContextAccessor;
		}
		public async Task<Person> GetPersonByNameAndSurrnameAsync(string Name,string Surrname)
		{
			Person person;
			using (var db = new AppDbContext(_dbContextOptions))
			{
				person = await  db.People.FirstOrDefaultAsync(model => model.Name == Name && model.Surrname == Surrname);
			}
			return person;
		}
		public async Task<bool> CreatePerson(Person person)
		{			
			using (var db = new AppDbContext(_dbContextOptions))
			{
				db.People.Add(person);
				await db.SaveChangesAsync();
			}
			return true;

		}

		public async Task<Person> DeletePerson(int Id)
		{
			using (var db = new AppDbContext(_dbContextOptions))
			{
				var Person = db.People.FirstOrDefault(u => u.Id == Id);

				if (Person != null)
				{
					db.People.Remove(Person);
					await db.SaveChangesAsync();
				}
				return Person;
			}
		}

		public async Task<IList<Person>> GetAllPersons()
		{
			var userId = _httpContextAccessor.HttpContext.User.FindFirst(JwtRegisteredClaimNames.Sid).Value.ToString();
			using (var db = new AppDbContext(_dbContextOptions))
			{

				var peopleList = await db.People.Where(person => person.UserId == userId).ToListAsync();
				return  peopleList;
			}
		}

		public async Task<Person> GetPersonById(int Id)
		{
			using (var db = new AppDbContext(_dbContextOptions))
			{
				return await db.People.FirstOrDefaultAsync(n => n.Id == Id);
			}
		}

		public async Task<Person> UpdatePerson(Person person)
		{
			using (var db = new AppDbContext(_dbContextOptions))
			{
				var Person = db.People.FirstOrDefault(u => u.Id == person.Id);

				Person.Class = person.Class;
				Person.Name = person.Name;
				Person.Notes = person.Notes;
				Person.Surrname = person.Surrname;
				Person.PrivateLessonTimes = person.PrivateLessonTimes;

				await db.SaveChangesAsync();
				return Person;
			}
		}
	}
}
