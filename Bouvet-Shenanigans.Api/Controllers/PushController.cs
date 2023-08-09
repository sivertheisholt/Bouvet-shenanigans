using Bouvet_Shenanigans.Api.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Bouvet_Shenanigans.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PushController : ControllerBase
    {
        public static DummySubscription DummySubscription { get; set; }

        [HttpPost("save-sub")]
        public IActionResult Post([FromBody] DummySubscription dummySubscription)
        {
            DummySubscription = dummySubscription;
            Console.WriteLine(dummySubscription.ToString());
            return Ok("Success");
        }
    }
}