using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ubuntu_docs.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddUserServiceProviderAccessTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserServiceProviders",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ServiceProviderId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserServiceProviders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserServiceProviders_ServiceProviders_ServiceProviderId",
                        column: x => x.ServiceProviderId,
                        principalTable: "ServiceProviders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserServiceProviders_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserServiceProviders_ServiceProviderId",
                table: "UserServiceProviders",
                column: "ServiceProviderId");

            migrationBuilder.CreateIndex(
                name: "IX_UserServiceProviders_UserId_ServiceProviderId",
                table: "UserServiceProviders",
                columns: new[] { "UserId", "ServiceProviderId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserServiceProviders");
        }
    }
}
