using Bouvet_Shenanigans.Api.Data;
using Bouvet_Shenanigans.Api.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;

namespace Bouvet_Shenanigans.Api
{
    public static class Startup
    {
        public static Task ConfigureServices(IServiceCollection services, IConfiguration config)
        {
            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

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

            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddHealthChecks();

            return Task.CompletedTask;
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

            app.UseCors(policy => policy.WithOrigins("https://localhost:3000", "https://localhost:7055", "http://localhost:5173")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.MapControllers();

            return Task.CompletedTask;
        }
    }
}