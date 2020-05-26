using Microsoft.EntityFrameworkCore.Migrations;

namespace PrivateLessonsApp.Migrations
{
    public partial class _123213 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_People_AspNetUsers_UserId",
                table: "People");

            migrationBuilder.DropIndex(
                name: "IX_People_UserId",
                table: "People");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "People");

            migrationBuilder.AddColumn<string>(
                name: "PersonId",
                table: "People",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_People_PersonId",
                table: "People",
                column: "PersonId");

            migrationBuilder.AddForeignKey(
                name: "FK_People_AspNetUsers_PersonId",
                table: "People",
                column: "PersonId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_People_AspNetUsers_PersonId",
                table: "People");

            migrationBuilder.DropIndex(
                name: "IX_People_PersonId",
                table: "People");

            migrationBuilder.DropColumn(
                name: "PersonId",
                table: "People");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "People",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_People_UserId",
                table: "People",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_People_AspNetUsers_UserId",
                table: "People",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
