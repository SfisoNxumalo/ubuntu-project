using Microsoft.EntityFrameworkCore;

namespace ubuntu_docs.Data
{
    public class UbuntuContext : DbContext
    {
        public UbuntuContext(DbContextOptions<UbuntuContext> options) : base(options) { }
    }
}
