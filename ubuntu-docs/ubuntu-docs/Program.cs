using Microsoft.EntityFrameworkCore;
using ubuntu_docs.Application.Interfaces.IRepositories;
using ubuntu_docs.Application.Interfaces.IServices;
using ubuntu_docs.Application.Services;
using ubuntu_docs.Data;
using ubuntu_docs.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

//Repository DI
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IServiceProviderRepository, ServiceProviderRepository>();
builder.Services.AddScoped<IAccessRepository, AccessRepository>();

// Service DI
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IServiceProviderService, ServiceProviderService>();
builder.Services.AddScoped<IAccessService, AccessService>();
builder.Services.AddScoped<IPdfExtractionService, PdfPigExtractionService>();



builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<UbuntuContext>(options =>
            options.UseSqlServer(
                builder.Configuration.GetConnectionString("DefaultConnection"),
                b => b.MigrationsAssembly(typeof(UbuntuContext).Assembly.FullName)
                ));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy
            .WithOrigins("http://localhost:5173", "http://localhost:5174", "")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});

var app = builder.Build();

app.MapGet("/", () => Results.Ok(new
{
    message = "The Ubuntu API is running",
    status = "success",
    version = "v1.0"
}));

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    //app.MapOpenApi();
}



app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("AllowFrontend");

app.MapControllers();

app.Run();
