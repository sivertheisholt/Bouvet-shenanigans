using Bouvet_Shenanigans.Api.DTOs;
using Bouvet_Shenanigans.Api.SignalR;
using Microsoft.AspNetCore.Mvc;

namespace Bouvet_Shenanigans.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TfController : ControllerBase
    {
        private readonly TfHub _tfHub;
        public TfController(TfHub tfHub)
        {
            _tfHub = tfHub;
        }

        [HttpPost("")]
        public async Task<IActionResult> Post([FromBody] TfDetectionDto tfDetectionDto)
        {
            try
            {
                await _tfHub.SendImage(tfDetectionDto);
            }
            catch (System.Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }

            return Ok();
        }
    }
}