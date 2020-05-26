using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PrivateLessonsApp.ViewModels
{
	public class TokenRequestViewModel
	{
		public TokenRequestViewModel()
		{ 
		}
		public string Grant_type { get; set; }
		public string Client_id { get; set; }
		public string Client_secret { get; set; }
		public string Username { get; set; }
		public string password { get; set; }
	}
}
