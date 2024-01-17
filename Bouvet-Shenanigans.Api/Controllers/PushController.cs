using Bouvet_Shenanigans.Api.Entities;
using Microsoft.AspNetCore.Mvc;
using WebPush;

namespace Bouvet_Shenanigans.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PushController : ControllerBase
    {
        private readonly IConfiguration _config;
        public readonly string _privateKey;
        public PushController(IConfiguration config)
        {
            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            _config = config;
            if (env == "Development")
            {
                _privateKey = _config["PrivateKey"]!;
            }
            else
            {
                _privateKey = Environment.GetEnvironmentVariable("PRIVATE_KEY")!;
            }
        }

        public static DummySubscription? DummySubscription { get; set; }


        [HttpPost("save-sub")]
        public IActionResult Post([FromBody] DummySubscription dummySubscription)
        {
            DummySubscription = dummySubscription;
            return Ok(new { data = new { success = true } });
        }

        [HttpPost("push-not")]
        public async Task<IActionResult> PostNot()
        {
            Console.WriteLine("Enpoint: " + DummySubscription.Endpoint);
            Console.WriteLine("Exp: " + DummySubscription.ExpirationTime);
            Console.WriteLine("Auth: " + DummySubscription.Keys.Auth);
            Console.WriteLine("P256dh: " + DummySubscription.Keys.P256dh);
            var webPushClient = new WebPushClient();
            var subscription = new PushSubscription(DummySubscription!.Endpoint, DummySubscription.Keys.P256dh, DummySubscription.Keys.Auth);
            var vapidDetails = new VapidDetails("mailto:sivert.heisholt@bouvet.no", "BOoQqpt5TXsZP0Ms1pzu4MIVsGld2uXzcvcOuppsweBM67yti1zog6Qr9dnnSKIHcr_L-29U3dqr7rUG8a_XotI", _privateKey);
            await webPushClient.SendNotificationAsync(subscription, "payload", vapidDetails);
            return Ok();
        }
    }
}