import { Termin } from "./termin.js";
import { Veterinar } from "./veterinar.js";
import { Ljubimac } from "./ljubimac.js";

export class Ambulanta
{

    constructor(id, naziv, pocRada, brSati, brTerminaPoh)
    {
        this.ID = id;
        this.Naziv = naziv;
        this.PocetakRada = pocRada; //PocetakRada = 8 => pocinju da rade u 8h
        this.BrojSati = brSati;
        this.BrojTerminaPoSatu = brTerminaPoh;
        //this.BrojOrdinacija = brOrdinacija;
        this.Kontejner = null;
        this.Registacija = null;
        this.Termini = [];
        this.Veterinari = [];
        this.KontVeterinari = null;

        this.SelVet = null;
    }

    dodajTermin(t)
    {
        this.Termini.push(t);
    }

    dodajVeterinara(vet)
    {
        this.Veterinari.push(vet);
    }

    crtajAmbulantu(host)
    {
        if(!host)
            throw new Exception("Roditeljski element ne postoji");
        
        this.Kontejner = document.createElement("div");
        this.Kontejner.classList.add("kontejner");
        host.appendChild(this.Kontejner);

        this.crtajFormu(this.Kontejner);
        this.crtajTermine(this.Kontejner);
        this.crtajVeterinare(this.Kontejner);
    }

    crtajFormu(host)    //Forma za rezervaciju termina
    {
        const kontForma = document.createElement("div");
        kontForma.className = "kontForma";
        kontForma.id = "zakazivanje";
        host.appendChild(kontForma);

        var elLabela = document.createElement("h3");
        elLabela.innerHTML = this.Naziv;
        kontForma.appendChild(elLabela);

        elLabela = document.createElement("h3");
        elLabela.innerHTML = "<u>Rezervacija termina</u>";
        kontForma.appendChild(elLabela);

        let opcija = null;
        let labela = null;
        let divRb = null;

        divRb = document.createElement("div");
        let selH = document.createElement("select");
        labela = document.createElement("label");
        labela.innerHTML = "h: "
        divRb.appendChild(labela);
        divRb.appendChild(selH);

        for(let i = this.PocetakRada; i < (this.PocetakRada + this.BrojSati); i++)
        {

            opcija = document.createElement("option");
            opcija.innerHTML = i;
            opcija.value = i;
            selH.appendChild(opcija);
        }

        kontForma.appendChild(divRb);

        let selM = document.createElement("select");
        labela = document.createElement("label");
        labela.innerHTML = " min: "
        divRb.appendChild(labela);
        divRb.appendChild(selM);

        for(let i = 0; i < this.BrojTerminaPoSatu; i++)
        {
            opcija = document.createElement("option");

            if(i == 0)
                opcija.innerHTML = "00";
            else
                opcija.innerHTML = i * 60/this.BrojTerminaPoSatu;
            
            opcija.value = i;
            selM.appendChild(opcija);
        }

        kontForma.appendChild(divRb);

        //JMBG vlasnika:   
        elLabela = document.createElement("label");
        elLabela.innerHTML = "<br/>JMBG: ";
        elLabela.className = "required";
        kontForma.appendChild(elLabela);
        
        let tb = document.createElement("input");
        tb.className = "jmbg";
        tb.classList.add("tbx");

        tb.type = "text";
        tb.maxLength = 13;
        tb.minLength = 13;
        tb.onkeypress=(ev => this.onlyNumberKey(ev));
        kontForma.appendChild(tb);

        //Ime ljubimca:
        elLabela = document.createElement("label");
        elLabela.innerHTML = "<br/>Ime ljubimca:";
        elLabela.className = "required";
        kontForma.appendChild(elLabela);
        
        tb = document.createElement("input");
        tb.className = "imeLjubimca";
        tb.type = "text";
        kontForma.appendChild(tb);

        //Veterinari:
        
        this.SelVet = document.createElement("select");
        labela = document.createElement("label");
        labela.innerHTML = "<br/><br/>Veterinar: "
        divRb.appendChild(labela);
        divRb.appendChild(this.SelVet);

        //Dugme za rezervisanje termina:
        const dugme = document.createElement("button");
        dugme.innerHTML = "Zakazi termin";
        dugme.className = "dugme";
        kontForma.appendChild(dugme);
        dugme.onclick=(ev)=>
        {
            let h = parseInt(selH.value);
            let m = parseInt(selM.value) * (60 / this.BrojTerminaPoSatu);

            let vet = this.SelVet.value;

            let jmbg = parseInt(this.Kontejner.querySelector(".jmbg").value);

            let imeLjubimca = this.Kontejner.querySelector(".imeLjubimca").value;

            console.log("h:min " + h + ":" + m);
            console.log("Vet: " + vet);
            console.log("jmbg: " + jmbg);
            console.log("Ime ljubimca: " + imeLjubimca);

            console.log("---------------------------");
            console.log("SELH:" + parseInt(selH.value));
            console.log("Pocetak rada: " + this.PocetakRada);
            console.log("Broj termina po satu: " + this.BrojTerminaPoSatu);
            console.log("SELM: " + parseInt(selM.value));

            var indeks = (parseInt(selH.value) - this.PocetakRada)* this.BrojTerminaPoSatu + parseInt(selM.value);

            if(this.Termini[indeks].zauzet == true)
            {
                alert("ZAUZET TERMIN!");

                return;
            }

            if(imeLjubimca == "" || isNaN(jmbg))
            {
                alert("Morate uneti sva neophodna polja!");

                return;
            }

            fetch(`https://localhost:5001/Ljubimac/PreuzmiLjubimca/${jmbg}&${imeLjubimca}`).
                then(res => {
                    if(res.status == 200)
                        {
                            res.json().then(data => {
                                fetch(`https://localhost:5001/Termin/UpisiTermin/${this.ID}&${vet}&${data.id}`, 
                                {
                                    method: "POST",
                                    headers: 
                                    {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify
                                    (
                                        {
                                            "sati": h,
                                            "minuti": m
                                        }
                                    )
                                }).then(res => {
                                    if(res.status == 200)
                                    {
                                        alert("Uspesno rezervisan termin!");

                                        this.Termini[indeks].azurirajTermin();

                                        location.reload();
                                    }
                                    else
                                    {
                                        alert("Greska pri rezervisanju termina!");
                                    }
                                })
                            })
                        }
                        else
                        {
                            alert("Greska pri slanju zahteva!\nProverite da li ste dobro uneli Vas JMBG i ime ljubimca.");
                        }
                })
        }

        //Dugme za otkazivanje termina:
        const dugme2 = document.createElement("button");
        dugme2.innerHTML = "Otkazi termin";
        dugme2.className = "dugme";
        kontForma.appendChild(dugme2);
        dugme2.onclick=(ev)=>
        {
            let h = parseInt(selH.value);
            let m = parseInt(selM.value) * (60 / this.BrojTerminaPoSatu);

            let vet = this.SelVet.value;

            let jmbg = parseInt(this.Kontejner.querySelector(".jmbg").value);

            let imeLjubimca = this.Kontejner.querySelector(".imeLjubimca").value;

            console.log("h:min " + h + ":" + m);
            console.log("Vet: " + vet);
            console.log("jmbg: " + jmbg);
            console.log("Ime ljubimca: " + imeLjubimca);


            console.log("---------------------------");
            console.log("SELH:" + parseInt(selH.value));
            console.log("Pocetak rada: " + this.PocetakRada);
            console.log("Broj termina po satu: " + this.BrojTerminaPoSatu);
            console.log("SELM: " + parseInt(selM.value));

            var indeks = (parseInt(selH.value) - this.PocetakRada)* this.BrojTerminaPoSatu + parseInt(selM.value);

            if(this.Termini[indeks].zauzet != true)
            {
                alert("Ne mozete otkazati termin koji nije zauzet.");

                return;
            }

            if(imeLjubimca == "" || isNaN(jmbg))
            {
                alert("Morate uneti sva neophodna polja!");

                return;
            }

            console.log(this.Termini[indeks]);

            fetch(`https://localhost:5001/Termin/PreuzmiTermin/${this.Termini[indeks].ID}`).
                then(res => {
                    if(res.status == 200)
                        {
                            res.json().then(data => {
                                console.log(data);

                                if(data.ljubimac.jmbgVlasnika != jmbg || data.ljubimac.ime != imeLjubimca)
                                {
                                    alert("JMBG i/ili ime ljubimca koje ste uneli se ne poklapaju sa podacima vezanim za izabrani termin.");

                                    return;
                                }
                                
                                console.log("ID JE: " + data.id);

                                fetch(`https://localhost:5001/Termin/IzbrisiTermin/${data.id}`, 
                                {
                                    method: "DELETE",
                                }).then
                                (res => {
                                    if(res.status == 200)
                                    {
                                        alert("Uspesno obrisan termin!");

                                        location.reload();
                                    }
                                    else
                                    {
                                        alert("Greska pri brisanju termina!");
                                    }
                                })
                            })
                        }
                        else
                        {
                            alert("Greska pri slanju zahteva!");
                        }
                })
        }

        var dugmici = kontForma.querySelectorAll(".dugme");

        if(this.Veterinari.length == 0)
        {
            dugmici.forEach(d => 
                {
                    d.disabled = true;
                })            
        }
        else
        {
            dugmici.forEach(d => 
                {
                    d.disabled = false;
                })  
        }
    }

    crtajTermine(host)
    {
        const kontTermini = document.createElement("div");
        kontTermini.className="kontTermini";
        host.appendChild(kontTermini);

        let red;
        let lokacija;
        let termin;

        for(let i = 0; i < this.BrojSati; i++)
        {
            red = document.createElement("div");
            red.className = "red";
            kontTermini.appendChild(red);

            for(let j = 0; j < this.BrojTerminaPoSatu; j++)
            {
                termin = new Termin(0, this.PocetakRada + i, j * (60 / this.BrojTerminaPoSatu), 0, 0, this.ID);
                this.dodajTermin(termin);
                termin.crtajTermin(red);
            }
        }
    }

    crtajVeterinare(host)
    {
        if(this.KontVeterinari != null)
            this.KontVeterinari.remove();
        
        this.KontVeterinari = document.createElement("div");
        
        var labela = document.createElement("h3");
        labela.innerHTML = "Veterinari";
        labela.className = "naslov";
        this.KontVeterinari.appendChild(labela);

        this.KontVeterinari.className = "kontVeterinari";
        
        host.appendChild(this.KontVeterinari);
        
        let red;
        let lokacija;
        let vet;
        let opcija;
        
        for(let i = 0; i < this.Veterinari.length; i++)
        {
            red = document.createElement("div");
            //red.className = "red";
            this.KontVeterinari.appendChild(red);

            console.log(this.Veterinari[i].Ime);

            this.Veterinari[i].crtajVeterinara(red);

            opcija = document.createElement("option");
            opcija.innerHTML = this.Veterinari[i].getPunoIme();
            opcija.value = this.Veterinari[i].ID; 
            this.SelVet.appendChild(opcija);
        }
    }

    onlyNumberKey(evt)  //nadjeno online
    {
        // Only ASCII character in that range allowed
        var ASCIICode = (evt.which) ? evt.which : evt.keyCode
        if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
            return false;
        return true;
    }
}