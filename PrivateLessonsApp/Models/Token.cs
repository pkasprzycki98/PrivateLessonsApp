using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PrivateLessonsApp.Models
{
	public class Token
	{
		public int Id { get; set; }
		public string UserId { get; set; }
		public string Value { get; set; }
		[ForeignKey("UserId")]
		public virtual User User { get; set; }

	}
}
