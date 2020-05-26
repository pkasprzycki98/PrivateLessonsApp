using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Swagger;
using PrivateLessonsApp.Data;
using PrivateLessonsApp.Services.Interfaces;
using PrivateLessonsApp.Services;
using Microsoft.AspNetCore.Http;
using PrivateLessonsApp.Helpers;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using PrivateLessonsApp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.OpenApi.Models;
using System;
using Swashbuckle.Swagger;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.IO;

namespace PrivateLessonsApp
{
	public class Startup
	{
		readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{

			services.AddControllersWithViews();

			

			services.AddSingleton<INoteService, NoteService>();
			services.AddSingleton<IPersonService, PersonService>();
			services.AddSingleton<IFile, FileService>();
			services.AddSingleton<IPrivateLessonTimeService, PrivateLessonTimeService>();

			services.AddIdentity<User, IdentityRole>(
			opts =>
			{
				opts.Password.RequireDigit = true;
				opts.Password.RequireLowercase = true;
				opts.Password.RequireUppercase = true;
				opts.Password.RequireNonAlphanumeric = false;
				opts.Password.RequiredLength = 7;
			})
			.AddEntityFrameworkStores<AppDbContext>();

			var connectionString = Configuration.GetConnectionString("PrivateLesson");

			services.AddEntityFrameworkSqlServer().AddDbContext<AppDbContext>((serviceProvider, options) => options.UseSqlServer(connectionString).UseInternalServiceProvider(serviceProvider));

			var dbContextOptionsbuilder = new DbContextOptionsBuilder<AppDbContext>();

			services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();

			services.AddSingleton(dbContextOptionsbuilder.Options);

			var appSettingsSection = Configuration.GetSection("AppSettings");

			services.Configure<AppSettings>(appSettingsSection);
			var appSettings = appSettingsSection.Get<AppSettings>();
			var key = Encoding.ASCII.GetBytes(appSettings.Secret);

			services.AddAuthentication(x =>
			{
				x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
			}).AddJwtBearer(x =>
			{
				x.RequireHttpsMetadata = false;
				x.SaveToken = true;
				x.TokenValidationParameters = new TokenValidationParameters
				{
					ValidateIssuerSigningKey = true,
					IssuerSigningKey = new SymmetricSecurityKey(key),
					ValidateIssuer = false,
					ValidateAudience = false
				};
			});
			

			// In production, the React files will be served from this directory
			services.AddSpaStaticFiles(configuration =>
			{
				configuration.RootPath = "ClientApp/build";
			});
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseExceptionHandler("/Error");
				// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
				app.UseHsts();
			}

			app.UseStaticFiles();
			app.UseCors(MyAllowSpecificOrigins);
			app.UseCors(builder => builder
			.AllowAnyOrigin()
			.AllowAnyMethod()
			.AllowAnyHeader()
			.WithExposedHeaders()
			 );

			
			


			app.UseHttpsRedirection();
			app.UseStaticFiles();
			app.UseSpaStaticFiles();

			app.UseRouting();

			app.UseAuthentication();
			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{		
				endpoints.MapControllerRoute(
					name: "default",
					pattern: "{controller}/{action=Index}/{id?}");
			});

			
			app.UseSpa(spa =>
			{
				spa.Options.SourcePath = "ClientApp";

				if (env.IsDevelopment())
				{
					spa.UseReactDevelopmentServer(npmScript: "start");
				}
			});
		}
	}
}
