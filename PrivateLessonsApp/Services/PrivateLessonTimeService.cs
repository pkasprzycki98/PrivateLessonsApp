using Microsoft.EntityFrameworkCore;
using PrivateLessonsApp.Data;
using PrivateLessonsApp.Models;
using PrivateLessonsApp.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PrivateLessonsApp.Services
{
	public class PrivateLessonTimeService : IPrivateLessonTimeService
	{
		private DbContextOptions<AppDbContext> _dbContextOptions;
		public PrivateLessonTimeService(DbContextOptions<AppDbContext> dbContextOptions)
		{
			_dbContextOptions = dbContextOptions;
		}
		public async Task<bool> CreatePrivateLessonTime(PrivateLessonTime privateLessonTime)
		{
			using (var db = new AppDbContext(_dbContextOptions))
			{
				db.PrivateLessonTimes.Add(privateLessonTime);
				await db.SaveChangesAsync();
			}
			return true;

		}

		public async Task<PrivateLessonTime> DeletePrivateLessonTime(int Id)
		{
			using (var db = new AppDbContext(_dbContextOptions))
			{
				var privateLessonTime = db.PrivateLessonTimes.FirstOrDefault(u => u.Id == Id);

				if (privateLessonTime != null)
				{
					db.PrivateLessonTimes.Remove(privateLessonTime);
					await db.SaveChangesAsync();
				}
				return privateLessonTime;

			}
		}
	
		public async Task<IEnumerable<PrivateLessonTime>> GetAllPrivateLessonTime()
		{
			using (var db = new AppDbContext(_dbContextOptions))
			{
				return await db.PrivateLessonTimes.ToListAsync();
			}
		}


		public async Task<IEnumerable<PrivateLessonTime>> GetPrivateLessonTimeByPersonId(int Id)
		{
			using (var db = new AppDbContext(_dbContextOptions))
			{
				return await db.PrivateLessonTimes.Where(n => n.PersonId == Id).ToListAsync();
			}
		}
		public async Task<PrivateLessonTime> GetTimeById(int Id)
		{
			using (var db = new AppDbContext(_dbContextOptions))
			{
				return await db.PrivateLessonTimes.FirstOrDefaultAsync(time => time.Id == Id);

			}
		}

			

		public async Task<PrivateLessonTime> UpdatePrivateLessonTime(PrivateLessonTime privateLessonTime)
		{
			using (var db = new AppDbContext(_dbContextOptions))
			{
				var lessonTime = db.PrivateLessonTimes.FirstOrDefault(plt => plt.Id == privateLessonTime.Id);

				lessonTime.Person = privateLessonTime.Person;
				lessonTime.PersonId = privateLessonTime.PersonId;
				lessonTime.Expense = privateLessonTime.Expense;
				lessonTime.Hour = privateLessonTime.Hour;
				lessonTime.Day = privateLessonTime.Day;
					
				await db.SaveChangesAsync();
				return lessonTime;
			}
		}
	
	}
}
