export class Ljubimac
{
    constructor(id, jmbgVlasnika, ime, vrsta, datRodj, pol, brCipa)
    {
        this.ID = id;
        this.JmbgVlasnika = jmbgVlasnika;
        this.Ime = ime;
        this.Vrsta = vrsta;
        this.DatumRodjenja = datRodj;
        this.Pol = pol;
        this.BrojCipa = brCipa;
    }

    crtajLjubimca(host)
    {
        if(!host)
            throw new Exception("Roditeljski element ne postoji!");
        
        this.kontejner = document.createElement("div");
        this.kontejner.classList.add("kontejner");
        host.appendChild(this.kontejner);

        this.crtajInformacije(this.kontejner);
    }

    crtajInformacije(host)
    {
        console.log(this.Ime);

        let el = document.createElement("label");
        el.innerHTML = this.Ime + "<br/>Pol: " + this.Pol + "<br/>Datum rodjenja: " + this.DatumRodjenja + "<br/>Broj cipa: " + this.BrojCipa + "<br/>JMBG vlasnika: " + this.JmbgVlasnika;
        host.appendChild(el);
    }
}