using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PrivateLessonsApp.Models
{
	public class Person
	{
		[Key]
		public int Id { get; set; }
		[Required]
		[MaxLength(30)]
		public string Name { get; set; }
		[Required]
		[MaxLength(30)]
		public string Surrname { get; set; }
		[Required]
		[MaxLength(30)]
		public string Class { get; set; }
		[NotMapped]
		public string Username { get; set; }
		public string UserId { get; set; }
		[ForeignKey("UserId")]
		public virtual User User { get; set; }
		public virtual List<PrivateLessonTime> PrivateLessonTimes { get; set; }

		public virtual List<Note> Notes  {get;set;}
	}
}
