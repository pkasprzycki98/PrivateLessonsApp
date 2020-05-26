using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PrivateLessonsApp.Models
{
	public class Note
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public int PersonId { get; set; }
		public string Topic { get; set; }
		[Required]
		public string Text { get; set; }
		[Required]
		public DateTime NoteDate { get; set; }
		[ForeignKey("PersonId")]
		public virtual Person Person { get; set; }
	}
}