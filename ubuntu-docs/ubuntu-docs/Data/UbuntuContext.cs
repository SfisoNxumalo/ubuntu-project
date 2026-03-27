using Microsoft.EntityFrameworkCore;
using ubuntu_docs.Domain.Entities;

namespace ubuntu_docs.Data
{
    public class UbuntuContext : DbContext
    {
        public UbuntuContext(DbContextOptions<UbuntuContext> options) : base(options) { }

        public DbSet<UserEntity> Users { get; set; }
        public DbSet<ServiceProviderEntity> ServiceProviders { get; set; }
        public DbSet<DocumentEntity> Documents { get; set; }
        public DbSet<UserDocumentEntity> UserDocuments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // USER
            modelBuilder.Entity<UserEntity>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.FirstName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.LastName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(200);
                entity.Property(e => e.PasswordHash).IsRequired();
                entity.Property(e => e.Role).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Phone).HasMaxLength(50);
                entity.Property(e => e.Province).HasMaxLength(100);

                entity.HasMany(e => e.UserDocuments)
                      .WithOne(ud => ud.User)
                      .HasForeignKey(ud => ud.UserId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // SERVICE PROVIDER
            modelBuilder.Entity<ServiceProviderEntity>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.CompanyName).IsRequired().HasMaxLength(200);
                entity.Property(e => e.RegistrationNumber).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(200);
                entity.Property(e => e.PhoneNumber).HasMaxLength(50);
                entity.Property(e => e.Address).HasMaxLength(300);
                entity.Property(e => e.PasswordHash).IsRequired();
                entity.Property(e => e.City).HasMaxLength(100);
                entity.Property(e => e.Country).HasMaxLength(100);
                entity.Property(e => e.ContactPersonName).HasMaxLength(200);
                entity.Property(e => e.LogoUrl).HasMaxLength(500);
                entity.Property(e => e.Industry).HasMaxLength(100);

                entity.HasMany(e => e.Documents)
                      .WithOne(d => d.ServiceProvider)
                      .HasForeignKey(d => d.ServiceProviderId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasMany(e => e.UserDocuments)
                      .WithOne(ud => ud.ServiceProvider)
                      .HasForeignKey(ud => ud.ServiceProviderId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            
            modelBuilder.Entity<DocumentEntity>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.FileName).IsRequired().HasMaxLength(255);
                entity.Property(e => e.FileUrl).IsRequired();
                entity.Property(e => e.BlobName).IsRequired();
                entity.Property(e => e.ContentType).HasMaxLength(100);
                entity.Property(e => e.Summary);

                entity.HasOne(e => e.ServiceProvider)
                      .WithMany(sp => sp.Documents)
                      .HasForeignKey(e => e.ServiceProviderId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasMany(e => e.UserDocuments)
                      .WithOne(ud => ud.Document)
                      .HasForeignKey(ud => ud.DocumentId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<UserDocumentEntity>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.AssignedAt).IsRequired();
                entity.Property(e => e.IsRead).IsRequired();

                entity.HasOne(e => e.User)
                      .WithMany(u => u.UserDocuments)
                      .HasForeignKey(e => e.UserId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.Document)
                      .WithMany(d => d.UserDocuments)
                      .HasForeignKey(e => e.DocumentId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.ServiceProvider)
                      .WithMany(sp => sp.UserDocuments)
                      .HasForeignKey(e => e.ServiceProviderId)
                      .OnDelete(DeleteBehavior.Restrict);

                
                entity.HasIndex(e => new { e.UserId, e.DocumentId })
                      .IsUnique();
            });
        }
    }
}
