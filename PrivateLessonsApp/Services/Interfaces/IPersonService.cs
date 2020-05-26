using PrivateLessonsApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PrivateLessonsApp.Services.Interfaces
{
	public interface IPersonService
	{
		Task<IList<Person>> GetAllPersons();
		Task<Person> GetPersonById(int Id);
		Task<bool> CreatePerson(Person person);
		Task<Person> UpdatePerson(Person person);
		Task<Person> DeletePerson(int Id);
		Task<Person> GetPersonByNameAndSurrnameAsync(string Name, string Surrname);
	}
}
