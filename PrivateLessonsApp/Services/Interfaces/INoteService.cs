using PrivateLessonsApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PrivateLessonsApp.Services.Interfaces
{
	public interface INoteService
	{
		Task<IEnumerable<Note>> GetAllNotes();
		Task<IEnumerable<Note>> GetNoteByPersonId(int Id);
		Task<Note> GetNoteById(int Id);
		Task<bool> CreateNote(Note note);
		Task<Note> UpdateNote(Note note);
		Task<Note> DeleteNote(int Id);
	}
}
