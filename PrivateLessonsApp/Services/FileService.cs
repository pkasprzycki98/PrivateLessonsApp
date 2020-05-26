using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using PrivateLessonsApp.Data;
using PrivateLessonsApp.Models;
using PrivateLessonsApp.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace PrivateLessonsApp.Services
{
	public class FileService : IFile
	{
		private readonly DbContextOptions<AppDbContext> _dbContextOptions;
		private readonly IWebHostEnvironment _env;

		public FileService(DbContextOptions<AppDbContext> dbContextOptions, IWebHostEnvironment env)
		{
			_env = env;
			_dbContextOptions = dbContextOptions;
		}
		public async Task<bool> AddFile(Files file)
		{
			file.fileName = file.File.FileName;
			if (file == null)
			{
				return false;
			}

			if (!Directory.Exists(_env.WebRootPath + "\\uploads\\"))
			{
				Directory.CreateDirectory(_env.WebRootPath + "\\uploads\\");
			}

			using (FileStream stream = File.Create(_env.WebRootPath + "\\uploads\\" + file.fileName))
			{
				file.File.CopyTo(stream);
				stream.Flush();
				file.fileUrl = stream.Name;
				using (var ms = new MemoryStream())
				{
					file.File.CopyTo(ms);
					file.fileArray = ms.ToArray();
				}
			}
			
			file.isDelete = false;
			file.createTime = DateTime.UtcNow;
			file.updateTime = DateTime.UtcNow;


			using (var db = new AppDbContext(_dbContextOptions))
			{
				db.Files.Add(file);
				await db.SaveChangesAsync();
			}

			return true;
		}

		public Task<bool> DeleteFile(Stream file)
		{
			throw new NotImplementedException();
		}

		public async Task<IList<Files>> GetAllFiles(int Noteid)
		{
			using (var db = new AppDbContext(_dbContextOptions))
			{
				return await db.Files.Where(files => files.NoteId == Noteid).ToArrayAsync();
			}
		}

		public Task<Stream> GetFileByFileName(string fileName)
		{
			throw new NotImplementedException();
		}

		public async Task<Files> GetFileById(int id)
		{
			using (var db = new AppDbContext(_dbContextOptions))
			{
				return await db.Files.FirstOrDefaultAsync(files => files.Id == id);
			}		
		}

		public Task<bool> UpdateFile(Stream file)
		{
			throw new NotImplementedException();
		}
	}
}
