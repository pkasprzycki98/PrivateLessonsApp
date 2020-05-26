using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PrivateLessonsApp.Migrations
{
    public partial class FileUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "file",
                table: "Files");

            migrationBuilder.AddColumn<byte[]>(
                name: "fileArray",
                table: "Files",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "fileName",
                table: "Files",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "fileUrl",
                table: "Files",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "fileArray",
                table: "Files");

            migrationBuilder.DropColumn(
                name: "fileName",
                table: "Files");

            migrationBuilder.DropColumn(
                name: "fileUrl",
                table: "Files");

            migrationBuilder.AddColumn<byte[]>(
                name: "file",
                table: "Files",
                type: "varbinary(max)",
                nullable: true);
        }
    }
}
