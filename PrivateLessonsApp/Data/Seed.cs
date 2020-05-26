using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PrivateLessonsApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PrivateLessonsApp.Data
{
	public static class DbSeeder
	{

		public static void Seed(DbContextOptions<AppDbContext> dbContext, RoleManager<IdentityRole> roleManager, UserManager<User> userManager)
		{

			using (var db = new AppDbContext(dbContext))
			{
				if(db.Users.Any() == false)
					CreateUsers(dbContext, roleManager, userManager).GetAwaiter().GetResult();
			
			}



				

		}
		private static async Task CreateUsers(DbContextOptions<AppDbContext> dbContext, RoleManager<IdentityRole> roleManager, UserManager<User> userManager)
		{
			string admin_role = "Admin";
			string user_role = "User";

			if (!await roleManager.RoleExistsAsync(admin_role))
				await roleManager.CreateAsync(new IdentityRole(admin_role));
			if (!await roleManager.RoleExistsAsync(user_role))
				await roleManager.CreateAsync(new IdentityRole(user_role));

			var user_admin = new User()
			{
				SecurityStamp = Guid.NewGuid().ToString(),
				UserName = "Admin",
				Email = "admin@admin.admin",
			};
			if (await userManager.FindByNameAsync(user_admin.UserName) == null)
			{
				await userManager.CreateAsync(user_admin, "Pass4Admin");
				await userManager.AddToRoleAsync(user_admin, user_role);
				await userManager.AddToRoleAsync(user_admin, admin_role);

				user_admin.EmailConfirmed = true;
				user_admin.LockoutEnabled = false;

			
			}

			var user_Kasprzyk = new User()
			{
				SecurityStamp = Guid.NewGuid().ToString(),
				UserName = "Kasprzyk",
				Email = "Kasprzyk1998@gmail.com",
			};
			if (await userManager.FindByNameAsync(user_Kasprzyk.UserName) == null)
			{
				await userManager.CreateAsync(user_Kasprzyk,"Pass4User");
				await userManager.AddToRoleAsync(user_Kasprzyk, user_role);

				user_Kasprzyk.EmailConfirmed = true;
				user_Kasprzyk.LockoutEnabled = false;
			}

			using (var db = new AppDbContext(dbContext))
			{
				await db.SaveChangesAsync();
			}

		}

	}
}
