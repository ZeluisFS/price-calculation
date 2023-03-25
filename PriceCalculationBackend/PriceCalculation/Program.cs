using PriceCalculation.Business.IoC;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Inversion of Control
ServiceIoCManager.RegisterMediatR(builder.Services);

var app = builder.Build();

var corsUrls = app.Configuration.GetSection("AllowedCORSUrls").Get<List<string>>();
app.UseCors(builder => builder
    .WithOrigins(corsUrls.ToArray())
    .AllowAnyMethod()
    .AllowCredentials()
    .AllowAnyHeader()
    .SetPreflightMaxAge(TimeSpan.FromHours(1))
);
// Configure the HTTP request pipeline.

//app.UseAuthorization();

app.MapControllers();

app.Run();
