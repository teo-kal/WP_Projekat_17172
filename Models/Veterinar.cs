using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebProjekat17172.Models
{
    [Table("Veterinar")]
    public class Veterinar
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Ime")]
        [MaxLength(25)]
        [MinLength(2)]
        public string Ime { get; set; }

        [Column("Prezime")]
        [MaxLength(25)]
        [MinLength(2)]
        public string Prezime { get; set; }

        [Column("DatumRodjenja")]
        public string DatumRodjenja { get; set; }

        [Column("Pol")]
        public char Pol { get; set; }

        [Column("StrucnaSprema")]
        [MaxLength(50)]
        [MinLength(5)]
        public string StrucnaSprema { get; set; }

        [Column("PutanjaDoSlike")]
        public string PutanjaDoSlike { get; set; }

        [JsonIgnore]
        public Ambulanta Ambulanta { get; set; } 
    }
}
