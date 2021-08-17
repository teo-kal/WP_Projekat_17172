using Microsoft.EntityFrameworkCore;

namespace WebProjekat17172.Models
{
    public class AmbulanteContext : DbContext
    {
        public DbSet<Ambulanta> Ambulante { get; set; }
        public DbSet<Termin> Termini { get; set; }
        public DbSet<Veterinar> Veterinari { get; set; }
        public DbSet<Ljubimac> Ljubimci { get; set; }

        public AmbulanteContext(DbContextOptions options) : base(options)
        {
             
        }   
    }   
}