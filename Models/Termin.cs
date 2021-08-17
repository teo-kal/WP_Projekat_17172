using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebProjekat17172.Models
{
    [Table("Termin")]
    public class Termin
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Sati")]
        public int Sati { get; set; }

        [Column("Minuti")]
        public int Minuti { get; set; }

        /*[Column("MaxKapacitet")]
        public int MaxKapacitet { get; set; }*/

        [JsonIgnore]
        public Ambulanta Ambulanta { get; set; }

        [JsonIgnore]
        public Veterinar Veterinar { get; set; }

        //[JsonIgnore]
        public Ljubimac Ljubimac { get; set; }
    }
}
