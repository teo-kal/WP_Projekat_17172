using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebProjekat17172.Models
{
    [Table("Ambulanta")]
    public class Ambulanta
    {
        private int _pocetakRada;
        private int _brojSati;
        private int _brojTerminaPoSatu;
        private int _brojOrdinacija;

        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Naziv")]
        [MaxLength(25)]
        [MinLength(2)]
        public string Naziv { get; set; }

        [Column("PocetakRada")]
        public int PocetakRada 
        { 
            get
            {
                return _pocetakRada;
            }
            set
            {
                if(value < 0 || value > 23)
                    throw new System.Exception("Nevalidan unos za pocetak rada!");
                else
                    _pocetakRada = value;
            }
        }

        [Column("BrojSati")]
        public int BrojSati
        { 
            get
            {
                return _brojSati;
            }
            set
            {
                if(value < 4 || value > 24)
                    throw new System.Exception("Nevalidan unos za broj sati!");
                else
                    _brojSati = value;
            }
        }


        [Column("BrojTerminaPoSatu")]
        public int BrojTerminaPoSatu
        { 
            get
            {
                return _brojTerminaPoSatu;
            }
            set
            {
                if(value < 0)
                    throw new System.Exception("Nevalidan unos za broj termina po satu!");
                else
                    _brojTerminaPoSatu = value;
            }
        }

        /*[Column("BrojOrdinacija")]
        public int BrojOrdinacija 
        { 
            get
            {
                return _brojOrdinacija;
            }
            set
            {
                if(value < 0)
                    throw new System.Exception("Nevalidan unos za broj ordinacija!");
                else
                    _brojOrdinacija = value;
            }
        }*/

        public virtual List<Termin> Termini { get; set; }

        public virtual List<Veterinar> Veterinari { get; set; }
    }
}
