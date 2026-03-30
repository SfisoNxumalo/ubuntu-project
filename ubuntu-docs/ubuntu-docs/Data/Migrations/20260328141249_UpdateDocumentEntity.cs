using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ubuntu_docs.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDocumentEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ContactPerson",
                table: "UserDocuments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "Documents",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContactPerson",
                table: "UserDocuments");

            migrationBuilder.DropColumn(
                name: "Content",
                table: "Documents");
        }
    }
}
