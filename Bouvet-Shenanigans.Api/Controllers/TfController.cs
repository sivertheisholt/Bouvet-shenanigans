using Bouvet_Shenanigans.Api.DTOs;
using Bouvet_Shenanigans.Api.SignalR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Bouvet_Shenanigans.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TfController : ControllerBase
    {
        private readonly IHubContext<TfHub> _tfHub;
        public TfController(IHubContext<TfHub> tfHub)
        {
            _tfHub = tfHub;
        }

        [HttpPost("")]
        public async Task<IActionResult> Post([FromBody] TfDetectionDto tfDetectionDto)
        {
            try
            {
                await _tfHub.Clients.All.SendAsync("tfImage", tfDetectionDto);
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