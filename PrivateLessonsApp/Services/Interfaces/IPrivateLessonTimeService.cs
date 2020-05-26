using PrivateLessonsApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PrivateLessonsApp.Services.Interfaces
{
	public interface IPrivateLessonTimeService
	{
		Task<IEnumerable<PrivateLessonTime>> GetAllPrivateLessonTime();
		Task<IEnumerable<PrivateLessonTime>> GetPrivateLessonTimeByPersonId(int Id);
		Task<bool> CreatePrivateLessonTime(PrivateLessonTime privateLessonTime);
		Task<PrivateLessonTime> GetTimeById(int Id);
		Task<PrivateLessonTime> UpdatePrivateLessonTime(PrivateLessonTime privateLessonTime);
		Task<PrivateLessonTime> DeletePrivateLessonTime(int Id);
	}
}
