export class Veterinar
{
    constructor(id, ime, prezime, datRodj, pol, strucnaSprema, putanja)
    {
        this.ID = id;
        this.Ime = ime;
        this.Prezime = prezime;
        this.DatumRodjenja = datRodj;
        this.Pol = pol;
        this.StrucnaSprema = strucnaSprema;
        this.PutanjaDoSlike = putanja; 
    }

    getPunoIme()
    {
        let punoIme = this.Ime + " " + this.Prezime

        return punoIme;
    }

    crtajVeterinara(host)
    {
        if(!host)
            throw new Exception("Roditeljski element ne postoji!");
        
        this.kontejner = document.createElement("div");
        this.kontejner.classList.add("kontVeterinar");
        host.appendChild(this.kontejner);

        this.crtajInformacije(this.kontejner);
    }

    crtajInformacije(host)
    {
        let img = document.createElement("img");
        img.src = this.PutanjaDoSlike;
        img.className = "slikaVet";
        host.appendChild(img);

        let el = document.createElement("label");
        el.innerHTML = this.Ime + " " + this.Prezime + "<br/><span class = 'vetSpan'>Pol: </span>" + this.Pol + "<br/><span class = 'vetSpan'>Datum rodjenja: </span>" + this.DatumRodjenja + "<br/><span class = 'vetSpan'>Strucna sprema: </span>" + this.StrucnaSprema;
        host.appendChild(el);
    }
}