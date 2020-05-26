using Microsoft.EntityFrameworkCore.Migrations;

namespace PrivateLessonsApp.Migrations
{
    public partial class addTopicTONote : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Topic",
                table: "Notes",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Topic",
                table: "Notes");
        }
    }
}
