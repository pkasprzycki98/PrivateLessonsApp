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
	public class NoteService : INoteService
	{
		private DbContextOptions<AppDbContext> _dbContextOptions;
		public NoteService(DbContextOptions<AppDbContext> dbContextOptions)
		{
			_dbContextOptions = dbContextOptions;
		}
		public async Task<bool> CreateNote(Note note) 
		{

			note.NoteDate = DateTime.Now;

			
			using (var db = new AppDbContext(_dbContextOptions))
			{
				 note.Person =  db.People.FirstOrDefault(person => person.Id == note.PersonId);

				if (note.Person == null)
				{
					return false;
				}

				db.Notes.Add(note);
				await db.SaveChangesAsync();
			}
			return true;

		}

		public async Task<Note> DeleteNote(int Id)
		{
			using (var db = new AppDbContext(_dbContextOptions))
			{
				var note = db.Notes.FirstOrDefault(u => u.Id == Id);

				if (note != null)
				{
					db.Notes.Remove(note);
					await db.SaveChangesAsync();					
				}
				return note;

			}
		}

		public async Task<IEnumerable<Note>> GetAllNotes()
		{
			using (var db = new AppDbContext(_dbContextOptions))
			{
				 return await db.Notes.ToListAsync();
			}
		}

		public async Task<IEnumerable<Note>> GetNoteByPersonId(int Id)
		{
			using (var db = new AppDbContext(_dbContextOptions))
			{			 
				var Note = await db.Notes.Where(n => n.PersonId == Id).ToListAsync();
				if (Note != null)
					return Note;
				else
					return null;
			}
		}
		public async Task<Note> GetNoteById(int Id)
		{
			using (var db = new AppDbContext(_dbContextOptions))
			{
				var Note = await db.Notes.FirstOrDefaultAsync(note => note.Id == Id);
				return Note;
			}
		}

		public async Task<Note> UpdateNote(Note note)
		{
			if (note == null)
			{
				return null;
			}
			using (var db = new AppDbContext(_dbContextOptions))
			{
				var Note = db.Notes.FirstOrDefault(u => u.Id == note.Id);

				Note.Topic = note.Topic;
				Note.NoteDate = note.NoteDate;
				Note.Person = note.Person;
				Note.PersonId = note.PersonId;
				Note.Text = note.Text;

				await db.SaveChangesAsync();
				return note;
			}
		}
	}
}
