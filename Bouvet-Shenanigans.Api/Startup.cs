using System.Text.Json;
using Bouvet_Shenanigans.Api.Data;
using Bouvet_Shenanigans.Api.Interfaces;
using Bouvet_Shenanigans.Api.Models;
using Bouvet_Shenanigans.Api.Services;
using Bouvet_Shenanigans.Api.SignalR;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Web;
using Microsoft.IdentityModel.Logging;

namespace Bouvet_Shenanigans.Api
{
    public static class Startup
    {
        public static Task ConfigureServices(IServiceCollection services, IConfiguration config)
        {
            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            services.AddScoped(typeof(AadService))
                    .AddScoped(typeof(PbiEmbedService));

            services.Configure<AzureAd>(config.GetSection("AzureAd"))
                .Configure<PowerBI>(config.GetSection("PowerBI"));

            services.AddScoped<IUnitOfWork, UnitOfWork>();

            services.AddDbContext<DataContext>(options =>
            {
                string connStr;

                if (env == "Development")
                {
                    connStr = config.GetConnectionString("DefaultConnection")!;
                }
                else
                {
                    connStr = Environment.GetEnvironmentVariable("DB_CONN_STR")!;
                }
                options.UseSqlServer(connStr);
            });

            services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                });

            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddHealthChecks();
            services.AddSignalR();

            return Task.CompletedTask;
        }

        public static void FixMicrosoftIdentityOptionsMonitorRaceCondition(IServiceProvider services)
        {
            var options = services.GetService<IOptionsMonitor<OpenIdConnectOptions>>();

            // By initializing the options before the application starts, we ensure that
            // no race condition can occur.
            options!.Get(OpenIdConnectDefaults.AuthenticationScheme);
        }

        public static async Task ConfigureDatabase(WebApplication app)
        {
            using var scope = app.Services.CreateScope();
            var services = scope.ServiceProvider;

            var context = services.GetRequiredService<DataContext>();

            await context.Database.MigrateAsync();
        }
        public static Task ConfigureMiddleware(WebApplication app)
        {
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCors(policy => policy.WithOrigins("https://localhost:3000", "https://localhost:7055", "http://localhost:5173", "https://pidetection.azurewebsites.net", "http://localhost:3333", "https://gentle-cliff-0a427ce03.4.azurestaticapps.net")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.MapFallbackToFile("index.html");

            app.MapControllers();

            app.MapHub<TfHub>("/hub");

            return Task.CompletedTask;
        }
    }
}