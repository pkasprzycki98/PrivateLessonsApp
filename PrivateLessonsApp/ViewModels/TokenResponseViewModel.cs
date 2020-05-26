using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PrivateLessonsApp.ViewModels
{
	public class TokenResponseViewModel
	{
		public TokenResponseViewModel() {
		}

		public string Value { get; set; }
		public int Expiration { get; set; }
	}
}
