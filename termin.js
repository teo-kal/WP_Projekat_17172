export class Termin
{
    constructor(id, h, m, vetID, ljubimacID, ambulantaID) 
    {
        this.ID = id;
        this.Sati = h;
        this.Minuti = m;
        //this.Kapacitet = 0;
        //this.MaxKapacitet = maxKapacitet;
        //this.tip = tip; //boja stanista
        //this.vrsta = vrsta;// lav, labud...
        this.VetID = vetID;
        this.LjubimacID = ljubimacID;
        this.AmbulantaID = ambulantaID;
        this.MiniKontejner = null;
    }

    getID()
    {
        return this.ID;
    }

    crtajTermin(host)
    {
        this.MiniKontejner = document.createElement("div");
        this.MiniKontejner.className = "termin";

        this.MiniKontejner.innerHTML = "Satnica: " + this.Sati + ":";

        if(this.Minuti == 0)
            this.MiniKontejner.innerHTML += "00";
        else
            this.MiniKontejner.innerHTML += this.Minuti; 
            
        this.MiniKontejner.innerHTML += "<br/>Prazno";

        this.MiniKontejner.style.backgroundColor = "lightgrey";

        host.appendChild(this.MiniKontejner);
    }

    azurirajTermin()
    {
        console.log("***Pozvano azuriranje termina");
        
        this.MiniKontejner.innerHTML = "Satnica: " + this.Sati + ":";

        if(this.Minuti == 0)
            this.MiniKontejner.innerHTML += "00";
        else
            this.MiniKontejner.innerHTML += this.Minuti;

        this.MiniKontejner.innerHTML += "<br/>ZAUZETO";
        this.zauzet = true; 
        
        this.MiniKontejner.style.backgroundColor = "rgb(255, 204, 203)";
    }
}