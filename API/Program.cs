using API.AppCode.IML;
using API.AppCode.IService;
using API.AppCode.ML;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DBCon");
var connectioConfig = new API.AppCode.Infrastructure.ConnectionStrings
{
    DBCon = connectionString,
};
// Add services to the container.
builder.Services.AddSingleton(connectioConfig);
builder.Services.AddScoped<IAppointment, Appointment_ML>();
builder.Services.TryAddScoped<IDapper, API.Data.Dapper>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
