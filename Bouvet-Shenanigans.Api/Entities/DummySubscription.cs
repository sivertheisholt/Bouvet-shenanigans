namespace Bouvet_Shenanigans.Api.Entities
{
    public class DummySubscription
    {
        public string Endpoint { get; set; }
        public string? ExpirationTime { get; set; } = "";
        public Key Keys { get; set; }
    }
}