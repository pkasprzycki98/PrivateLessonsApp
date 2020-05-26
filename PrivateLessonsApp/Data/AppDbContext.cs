using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PrivateLessonsApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PrivateLessonsApp.Data
{
	public class AppDbContext : IdentityDbContext<User>
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
		{

		}

		public DbSet<Person> People { get; set; }
		public DbSet<Note> Notes { get; set; }
		public DbSet<PrivateLessonTime> PrivateLessonTimes { get; set; }
		public DbSet<Files> Files { get; set; }
		protected override void OnConfiguring(DbContextOptionsBuilder options)
	=> options.UseSqlServer("Server=tcp:privatelesson.database.windows.net,1433;Initial Catalog=privatelesson;Persist Security Info=False;User ID=Kasprzyk;Password=Pass4Admin;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");

	}
}
