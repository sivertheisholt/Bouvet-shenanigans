using Bouvet_Shenanigans.Api.DTOs;
using Microsoft.AspNetCore.SignalR;

namespace Bouvet_Shenanigans.Api.SignalR
{
    public class TfHub : Hub
    {
        public async Task SendImage(TfDetectionDto tfDetectionDto)
        {
            await Clients.All.SendAsync("tfImage", tfDetectionDto);
        }
    }
}