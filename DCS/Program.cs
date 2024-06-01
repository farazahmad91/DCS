using API.AppCode.Configuration;
using API.AppCode.IML;
using API.AppCode.Infrastructure;
using API.Connection;
using API.DBContext;
using API.RequestInfo;
using API.SendEmail;
using DCS.Models;
using Entities;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System.Configuration;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Set up connection strings
var dbConnectionString = configuration.GetConnectionString("Default");
var connectionStrings = new ConnectionStrings { Default = dbConnectionString };
builder.Services.AddSingleton<ConnectionStrings>(connectionStrings);

// Add DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(connectionStrings.Default);
});
// Add services to the container.
builder.Services.AddControllersWithViews().AddRazorRuntimeCompilation();
builder.Services.AddScoped<Sendmail>();
builder.Services.AddScoped<UploadImage>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddSingleton<IRequestInfo, RequestInfo>();
builder.Services.AddTransient<Sendmail>();
builder.Services.AddTransient<EmailHtmlBody>();
builder.Services.AddTransient<EmailCredential>();
builder.Services.AddScoped<API.AppCode.IML.IDapper, API.Data.Dapper>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(options =>
{
    options.LoginPath = "/Account/Login";
    options.LogoutPath = "/Account/logout";
    options.AccessDeniedPath = "/Home/Error";
});
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(1); // You can adjust the timeout as needed
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        c.RoutePrefix = "afebe6e28e6d4edd91ffd9d014c1f100"; // The relative path to access Swagger UI
        c.InjectStylesheet("/css/swagger-custom-style.css"); // Inject custom CSS
        c.InjectJavascript("/js/swagger-custom-script.js");  // Inject custom JavaScript
        c.DefaultModelsExpandDepth(-1); // Collapse models by default
    });
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Admin}/{action=Home}/{id?}");

app.Run();
