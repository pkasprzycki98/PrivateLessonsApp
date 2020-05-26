using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace PrivateLessonsApp.Models
{
	public class Files
	{
		[Key]
		public int Id { get; set; }
		[NotMapped]
		public IFormFile File { get; set; }
		public byte[] fileArray { get; set; }
		public int NoteId { get; set; }
		public string fileUrl { get; set; }
		public string fileName { get; set; }
		public DateTime createTime { get; set; }
		public DateTime updateTime { get; set; }
		public bool isDelete { get; set; }
		[ForeignKey("NoteId")]
		public virtual Note Note { get; set; }
	}
}
