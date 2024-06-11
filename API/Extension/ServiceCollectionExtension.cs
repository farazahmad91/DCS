﻿using Microsoft.AspNetCore.Identity;
using Microsoft.OpenApi.Models;
using System.Text;
using API.Connection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using API.Service;
using API.DBContext;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using API.AppCode.Infrastructure;
using API.AppCode.IML;
using API.AppCode.ML;
using API.SendEmail;
using System.Configuration;
using API.RequestInfo;
using Entities;
using API.AppCode.IService;

namespace API.Extension
{
    public static class ServiceCollectionExtension
    {
        public static void RegisterService(this IServiceCollection services, IConfiguration configuration)
        {
            string dbConnectionString = configuration.GetConnectionString("Default");
            ConnectionStrings ch = new ConnectionStrings { Default = dbConnectionString };
            services.AddScoped<Data.Dapper>();
            services.AddScoped<IAppointment, Appointment_ML>();
            services.AddScoped<IDapper, Data.Dapper>();
            services.AddScoped<IErrorLog, ErrorLog_ML>();
            services.AddScoped<IHashPassword, HashPassword>();       
            services.AddScoped<IInvoice, Invoice_ML>();
            services.AddScoped<IUserValidation, UserValidation>();
            services.AddScoped<IUserService, UserService>();
            services.AddSingleton<ConnectionStrings>(ch);
            services.Configure<EmailSettings>(configuration.GetSection("EmailSettings"));
            services.AddTransient<Sendmail>();
            services.AddTransient<EmailHtmlBody>();
            services.AddTransient<IEmail , Email_ML>();
            services.AddTransient<EmailCredential>();
			services.AddSingleton<IRequestInfo, RequestInfo.RequestInfo>();
            services.AddHttpContextAccessor();
            services.AddHttpClient();
            services.AddScoped<IMedicineManagement, MedicineManagement_ML>();
            services.AddScoped<IProjectDetails, ProjectDetails_ML>();
            services.AddScoped<IApplicationSetting, ApplicationSetting_ML>();
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(ch.Default);
            });

            services.AddIdentity<ApplicationUser, IdentityRole>(
                 options =>

                 {
                     options.Password.RequireDigit = true;
                     options.Password.RequiredLength = 5;
                     options.Password.RequireLowercase = true;
                 }
                 ).AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders();
            services.AddAuthentication(auth =>
            {
                auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                auth.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = configuration["AuthSettings:Audience"],
                    ValidIssuer = configuration["AuthSettings:Issuer"],
                    RequireExpirationTime = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["AuthSettings:Secretkey"])),
                    ValidateIssuerSigningKey = true
                };
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "DCS", Version = "v1" });

                // Configure Swagger to use JWT for authorization
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme.",
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
 {
    {
        new OpenApiSecurityScheme
        {
            Reference = new OpenApiReference
            {
                Type = ReferenceType.SecurityScheme,
                Id = "Bearer"
            }
        },
        new string[] { }
    }
 });
            });

        }


    }
}
