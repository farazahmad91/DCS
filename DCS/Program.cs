using API.AppCode.Infrastructure;
using API.DBContext;
using API.RequestInfo;
using API.SendEmail;
using DCS.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Set up connection strings
var dbConnectionString = configuration.GetConnectionString("Default");
var connectionStrings = new ConnectionStrings { Default = dbConnectionString };
builder.Services.AddSingleton(connectionStrings);

// Add DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(connectionStrings.Default);
});

// Add services to the container
builder.Services.AddControllersWithViews().AddRazorRuntimeCompilation();
builder.Services.AddHttpContextAccessor();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(20); // Adjust the timeout as needed
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

builder.Services.AddScoped<Sendmail>();
builder.Services.AddScoped<UploadImage>();
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
    options.LogoutPath = "/Account/Logout";
    options.AccessDeniedPath = "/Home/Error";
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
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
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseSession(); // Add this line to use session middleware
app.UseAuthentication(); // Ensure authentication is before authorization
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Admin}/{action=Home}/{id?}");

app.Run();
