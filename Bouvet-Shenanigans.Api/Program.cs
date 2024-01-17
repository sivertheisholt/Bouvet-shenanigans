using Bouvet_Shenanigans.Api;

try
{
    var builder = WebApplication.CreateBuilder(args);

    await Startup.ConfigureServices(builder.Services, builder.Configuration);

    var app = builder.Build();

    Startup.FixMicrosoftIdentityOptionsMonitorRaceCondition(app.Services);

    await Startup.ConfigureDatabase(app);

    await Startup.ConfigureMiddleware(app);

    await app.RunAsync();
}
catch (Exception e)
{
    Console.WriteLine("Error: " + e);
}