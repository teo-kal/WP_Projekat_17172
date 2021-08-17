using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebProjekat17172.Models
{
    [Table("Ljubimac")]
    public class Ljubimac
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("JMBGVlasnika")]
        [MaxLength(13)]
        [MinLength(13)]
        public string JMBGVlasnika { get; set; }

        [Column("Ime")]
        [MaxLength(25)]
        [MinLength(2)]
        public string Ime { get; set; }

        [Column("Vrsta")]
        public string Vrsta { get; set; }

        [Column("DatumRodjenja")]
        public string DatumRodjenja { get; set; }

        [Column("Pol")]
        public char Pol { get; set; }

        [Column("BrojCipa")]
        public string BrojCipa { get; set; }
    }
}
