using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ubuntu_docs.Domain.Entities
{
    public abstract class BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public  DateTime CreatedAt { get; set; } = DateTime.Now;

        public  DateTime? UpdatedAt { get; set; } = DateTime.Now;

        public  bool IsDeleted { get; set; } = false;
    }
}
