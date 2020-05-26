using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mime;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PrivateLessonsApp.Models;
using PrivateLessonsApp.ViewModels;
using Mapster;
using PrivateLessonsApp.Services.Interfaces;

namespace PrivateLessonsApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        private readonly IFile _fileService;
        public FilesController(IWebHostEnvironment env, IFile fileservice) : base()
        {
            _fileService = fileservice;
            _env = env;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var files = await _fileService.GetAllFiles(id);

            return new JsonResult(files);
        } 
        [HttpGet("Download/{id}")]
        public async Task<IActionResult> Download(int id)
        {
            Files file = await _fileService.GetFileById(id);

            
            var byteArray = file.fileArray;

            var ms = new MemoryStream(byteArray);

            using (FileStream fileStream = System.IO.File.Create(_env.WebRootPath + "\\download\\" + file.fileName))
            {
                ms.CopyTo(fileStream);              
                fileStream.Flush();         
            }

            byte[] stream = System.IO.File.ReadAllBytes(_env.WebRootPath + "\\download\\" + file.fileName);

            return new FileContentResult(stream, "application/octet-stream")
            {
                FileDownloadName = file.fileName
            };

        }
        [HttpGet("DwonloadDisponse/{id}")]
        public async Task<HttpResponseMessage> DownloadDisponse(int id)
        {
            var file = await _fileService.GetFileById(id);
            var stream = new MemoryStream(file.fileArray);
            // processing the stream.

            var result = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(stream.ToArray())
            };
            result.Content.Headers.ContentDisposition =
                new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                {
                    FileName = file.fileName
                };
            result.Content.Headers.ContentType =
                new MediaTypeHeaderValue("application/octet-stream");

            return result;
        }
      
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] FileViewModel data)
        {
            Files file = new Files();

            file.File = data.File;
            file.NoteId = data.NoteId;

            await _fileService.AddFile(file);
            return NotFound();

           
        }
    }
}