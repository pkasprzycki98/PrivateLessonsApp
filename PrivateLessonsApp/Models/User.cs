using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PrivateLessonsApp.Models
{
	public class User : IdentityUser
	{
		public User()
		{
			
		}
		public string DisplayName { get; set; }
		public string Password { get; set; }
		public virtual List<Person> People { get; set; }
		public virtual List<Token> Tokens { get; set; }
    }
}
