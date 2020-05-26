using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PrivateLessonsApp.Models;
using PrivateLessonsApp.Services.Interfaces;

namespace PrivateLessonsApp.Controllers
   {
    [ApiController]
    [Route("api/[controller]")]
    public class NoteController : ControllerBase
    {
        private INoteService _noteService { get; set; }

        public NoteController(INoteService noteService)
        {
            _noteService = noteService;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return new JsonResult(await _noteService.GetAllNotes());
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int Id)
        {
            return new JsonResult(await _noteService.GetNoteById(Id));
        }
        [HttpGet("GetPersonNote/{id}")]
        public async Task<IActionResult> GetPersonNote(int Id)
        {
            return new JsonResult(await _noteService.GetNoteByPersonId(Id));
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] Note note)
        {
            if (note == null)
            {
                return NotFound();
            }
            return new JsonResult(await _noteService.CreateNote(note));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int Id)
        {        
            return new JsonResult(await _noteService.DeleteNote(Id));
        }
        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put([FromBody] Note note)
        {
            var tempnote = await _noteService.GetNoteById(note.Id);

            note.PersonId = tempnote.PersonId;
            if (note == null)
            {
                return NotFound();
            }
            return new JsonResult(await _noteService.UpdateNote(note));
        }
     }
}