using PrivateLessonsApp.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace PrivateLessonsApp.Services.Interfaces
{
	public interface IFile
	{
		Task<IList<Files>> GetAllFiles(int Noteid);
		Task<Files> GetFileById(int id);
		Task<Stream> GetFileByFileName(string fileName);
		Task<bool> AddFile(Files file);
		Task<bool> UpdateFile(Stream file);
		Task<bool> DeleteFile(Stream file);

	}
}
