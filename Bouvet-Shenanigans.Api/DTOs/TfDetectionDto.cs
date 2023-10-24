namespace Bouvet_Shenanigans.Api.DTOs
{
    public class TfDetectionDto
    {
        public required string Base64 { get; set; }
        public int Detections { get; set; }
    }
}