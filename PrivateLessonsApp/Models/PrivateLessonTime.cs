using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PrivateLessonsApp.Models
{
	public class PrivateLessonTime
	{
		[Key]
		public int Id { get; set; }
		public int PersonId { get; set; }
		[Required]
		public string Day { get; set; }
		[Required]
		public string Hour { get; set; }
		[Required]
		public string Expense { get; set; }
		public virtual Person Person { get; set; }
	}
}
