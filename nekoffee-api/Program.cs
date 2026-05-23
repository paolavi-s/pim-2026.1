using Microsoft.EntityFrameworkCore;
using nekoffee.Data;
using nekoffee.EndPoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ClientesContexto>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()              
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddOpenApi();

var app = builder.Build();

// Middlewares - Comunicação com o JS

app.UseCors("AllowFrontend");               
app.MapClientesEndPoints();                 
app.MapControllers();

var port = Environment.GetEnvironmentVariable("PORT") ?? "5052";
app.Run($"http://0.0.0.0:{port}");