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
    [Route("api/[controller]")]
    [ApiController]
    public class TimeController : ControllerBase
    {
        private IPrivateLessonTimeService _privateLessonTimeService { get; set; }
        public TimeController(IPrivateLessonTimeService privateLessonTimeService)
        {
            _privateLessonTimeService = privateLessonTimeService;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return new JsonResult(await _privateLessonTimeService.GetAllPrivateLessonTime());
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return new JsonResult(await _privateLessonTimeService.GetTimeById(id));
        }
        [HttpGet("GetPersonTime/{id}")]
        public async Task<IActionResult> PersonTime(int id)
        {
            return new JsonResult(await _privateLessonTimeService.GetPrivateLessonTimeByPersonId(id));
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] PrivateLessonTime privateLessonTime)
        {
            if (privateLessonTime == null)
            {
                return NotFound();
            }
            return new JsonResult(await _privateLessonTimeService.CreatePrivateLessonTime(privateLessonTime));
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] PrivateLessonTime privateLessonTime)
        {
            var tempTime = await _privateLessonTimeService.GetTimeById(privateLessonTime.Id);
            privateLessonTime.PersonId = tempTime.PersonId;
            if (privateLessonTime == null)
            {
                return NotFound();
            }
            return new JsonResult(await _privateLessonTimeService.UpdatePrivateLessonTime(privateLessonTime));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return new JsonResult(await _privateLessonTimeService.DeletePrivateLessonTime(id));
        }


    }
}