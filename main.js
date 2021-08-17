import {Ambulanta} from "./ambulanta.js"
import { Ljubimac } from "./ljubimac.js";
import { Termin } from "./termin.js";
import {Veterinar} from "./veterinar.js"


    const kontZaLjubimce = document.createElement("div");
    kontZaLjubimce.classList = "kontLjubimci";
    kontZaLjubimce.classList.add("kontejner");
    kontZaLjubimce.id = "zaLjubimce";

    document.body.appendChild(kontZaLjubimce);

    function prveKontrole(host, ljubimac, strana)
    {
        //JMBG vlasnika:   
        let elLabela = document.createElement("label");
        elLabela.innerHTML = "<br/>Vas JMBG: ";
        elLabela.classList.add("required");
        host.appendChild(elLabela);
        
        let tb = document.createElement("input");
        tb.className = "tbx";
        tb.classList.add("jmbg" + strana);
        tb.type = "number";
        if(ljubimac != null)
            tb.value = ljubimac.JmbgVlasnika;
        tb.maxLength = 13;
        tb.minLength = 13;
        host.appendChild(tb);

        //Ime ljubimca:
        elLabela = document.createElement("label");
        elLabela.innerHTML = "<br/>Ime ljubimca:";
        elLabela.classList.add("required");
        host.appendChild(elLabela);
        
        tb = document.createElement("input");
        tb.className = "tbx";
        tb.classList.add("imeLjubimca" + strana);
        if(ljubimac != null)
            tb.value = ljubimac.Ime;
        tb.type = "text";
        host.appendChild(tb);

        let vrsteZivotinja =["Macka", "Pas", "Ptica", "Hrcak", "Kornjaca", "Zec", "Ostalo"];
        
        let opcija = null;
        let labela = null;
        let divRb = null;

        let divSviRb = document.createElement("div");
        divSviRb.className = "divSviRb";

        vrsteZivotinja.forEach((vrsta)=>
        {
            divRb = document.createElement("div");
            opcija = document.createElement("input");
            opcija.type = "radio";
            opcija.name = "vrsta" + strana;
            opcija.value = vrsta;

            if(ljubimac != null && opcija.value == ljubimac.Vrsta)
                opcija.checked = true;
            else
                if(opcija.value == vrsteZivotinja[0])
                    opcija.checked = true;

            labela = document.createElement("label");
            labela.innerHTML = vrsta;

            divRb.appendChild(opcija);
            divRb.appendChild(labela);
            divSviRb.appendChild(divRb);
        })

        host.appendChild(divSviRb);
    }

    function drugeKontrole(host, ljubimac, strana)
    {
        //Datum rodjenja:   
        let elLabela = document.createElement("label");
        elLabela.innerHTML = "<br/>Datum rodjenja: ";
        elLabela.classList.add("required");
        host.appendChild(elLabela);
        
        let tb = document.createElement("input");
        tb.className = "tbx";
        tb.classList.add("datRodjenja" + strana);
        tb.type = "date";
        if(ljubimac != null)
            tb.value = ljubimac.DatumRodjenja;
        host.appendChild(tb);

        //Broj cipa:
        elLabela = document.createElement("label");
        elLabela.innerHTML = "<br/>Broj cipa:";
        host.appendChild(elLabela);
        
        tb = document.createElement("input");
        tb.className = "tbx";
        tb.classList.add("brCipa" + strana);
        tb.type = "number";
        if(ljubimac != null)
            tb.value = ljubimac.BrojCipa;
        host.appendChild(tb);

        //Pol:
        let divSviRb = document.createElement("div");
        divSviRb.className = "divSviRb";

        let divRb = document.createElement("div");
        let opcija = document.createElement("input");
        opcija.type = "radio";
        opcija.name = "pol" + strana;
        opcija.value = "m";

        if(opcija.value == "m")
            opcija.checked = true;

        let labela = document.createElement("label");
        labela.innerHTML = "Musko";

        divRb.appendChild(opcija);
        divRb.appendChild(labela);
        divSviRb.appendChild(divRb);

        divRb = document.createElement("div");
        opcija = document.createElement("input");
        opcija.type = "radio";
        opcija.name = "pol" + strana;
        opcija.value = "z";

        if(ljubimac != null && opcija.value == ljubimac.Pol)
            opcija.checked = true;

        labela = document.createElement("label");
        labela.innerHTML = "Zensko";

        divRb.appendChild(opcija);
        divRb.appendChild(labela);
        divSviRb.appendChild(divRb);

        host.appendChild(divSviRb);
    }

    function crtajFormuRegistracija(host)
    {
        const kontForma = document.createElement("div");
        kontForma.className = "kontRegistracija";
        kontForma.classList.add("kontejner");
        kontForma.id = "registracija";
        host.appendChild(kontForma);

        var elLabela = document.createElement("h3");
        elLabela.innerHTML = "Registracija ljubimca";
        kontForma.appendChild(elLabela);

        prveKontrole(kontForma, null, "L");
        drugeKontrole(kontForma, null, "L");

        //Dugme:
        const dugme = document.createElement("button");
        dugme.innerHTML = "Potvrdi";
        dugme.className = "dugme";
        kontForma.appendChild(dugme);
        dugme.onclick=(ev)=>
        {
            let jmbg = parseInt(host.querySelector(".jmbgL").value);

            let imeLjubimca = host.querySelector(".imeLjubimcaL").value;

            const vrsta = host.querySelector('input[name="vrstaL"]:checked').value;

            let datRodj = host.querySelector(".datRodjenjaL").value;

            let brCipa = parseInt(host.querySelector(".brCipaL").value);

            const pol = host.querySelector('input[name="polL"]:checked').value;

            console.log("jmbg: " + jmbg);
            console.log("Ime ljubimca: " + imeLjubimca);
            console.log("Vrsta: " + vrsta);
            console.log("Datum rodjenja: " + datRodj);
            console.log("Broj cipa: " + brCipa);
            console.log("Pol: " + pol);


            if(isNaN(jmbg) || imeLjubimca == "" || datRodj == "")
            {
                alert("Morate uneti sva neophodna polja!");

                return;
            }

            fetch("https://localhost:5001/Ljubimac/UpisiLjubimca", 
            {
                method: "POST",
                headers: 
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify
                (
                    {
                        jmbgVlasnika: jmbg.toString(),
                        ime: imeLjubimca,
                        vrsta: vrsta,
                        datumRodjenja: datRodj,
                        pol: pol,
                        brojCipa: brCipa.toString()
                    }
                )
            }).then
                (p => {
                    if (p.ok) 
                    {
                        alert("Vas ljubimac je uspesno upisan!");

                        location.reload();
                    }
                    else if (p.status == 400) 
                    {
                        alert("Greska prilikom upisa.")
                    }
                }).catch(p => {
                    alert("Greška prilikom upisa.");
            });       
        }
    }

    function crtajDugmice(host, ljubimac)
    {
        let pradeda = host.parentNode.parentNode;

        //Dugme 1:
        const dugme1 = document.createElement("button");
        dugme1.innerHTML = "Obrisi";
        dugme1.className = "dugmici";
        dugme1.classList.add("dugme");
        host.appendChild(dugme1);
        dugme1.onclick=(ev)=>
        {
            let jmbg = parseInt(pradeda.querySelector(".jmbgD").value);

            let imeLjubimca = pradeda.querySelector(".imeLjubimcaD").value;

            const vrsta = pradeda.querySelector('input[name="vrstaD"]:checked').value;

            let datRodj = pradeda.querySelector(".datRodjenjaD").value;

            let brCipa = parseInt(pradeda.querySelector(".brCipaD").value);

            const pol = pradeda.querySelector('input[name="polD"]:checked').value;

            console.log("jmbg: " + jmbg);
            console.log("Ime ljubimca: " + imeLjubimca);
            console.log("Vrsta: " + vrsta);
            console.log("Datum rodjenja: " + datRodj);
            console.log("Broj cipa: " + brCipa);
            console.log("Pol: " + pol);

            if (confirm('Da li ste sigurni da zelite da obrisete ljubimca?')) 
            {
                fetch("https://localhost:5001/Ljubimac/IzbrisiLjubimca/" + ljubimac.ID, 
                {
                    method: "DELETE"
                }).then
                    (p => {
                        if (p.ok) 
                        {
                            alert("Vas ljubimac je uspesno obrisan!");

                            location.reload();
                        }
                        else if (p.status == 400) 
                        {
                            alert("Greska prilikom brisanja.")
                        }
                    }).catch(p => {
                        alert("Greska prilikom brisanja.");
                });
            } 
            else 
            {
                return;
            }
        }

        //Dugme 2:
        const dugme2 = document.createElement("button");
        dugme2.innerHTML = "Izmeni";
        dugme2.className = "dugmici";
        dugme2.classList.add("dugme");
        host.appendChild(dugme2);
        dugme2.onclick=(ev)=>
        {
            let jmbg = parseInt(pradeda.querySelector(".jmbgD").value);

            let imeLjubimca = pradeda.querySelector(".imeLjubimcaD").value;

            const vrsta = pradeda.querySelector('input[name="vrstaD"]:checked').value;

            let datRodj = pradeda.querySelector(".datRodjenjaD").value;

            let brCipa = parseInt(pradeda.querySelector(".brCipaD").value);

            const pol = pradeda.querySelector('input[name="polD"]:checked').value;

            console.log("jmbg: " + jmbg);
            console.log("Ime ljubimca: " + imeLjubimca);
            console.log("Vrsta: " + vrsta);
            console.log("Datum rodjenja: " + datRodj);
            console.log("Broj cipa: " + brCipa);
            console.log("Pol: " + pol);

            if (confirm('Da li ste sigurni da zelite da sacuvate promene?')) 
            {
                fetch("https://localhost:5001/Ljubimac/IzmeniLjubimca", 
                    {
                        method: "PUT",
                        headers: 
                        {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify
                        (
                            {
                                id: ljubimac.ID,
                                jmbgVlasnika: jmbg.toString(),
                                ime: imeLjubimca,
                                vrsta: vrsta,
                                datumRodjenja: datRodj,
                                pol: pol,
                                brojCipa: brCipa.toString()
                            }
                        )
                    }).then
                        (p => {
                            if (p.ok) 
                            {
                                alert("Vas ljubimac je uspesno izmenjen!");

                                location.reload();
                            }
                            else if (p.status == 400) 
                            {
                                alert("Greska prilikom izmene.")
                            }
                        }).catch(p => {
                            alert("Greska prilikom izmene.");
                    }); 
            }  
            else
            {
                return;
            }    
        }
    }

    function crtajFormuPretraga(host)
    {
        const kontForma = document.createElement("div");
        kontForma.className = "kontRegistracija";
        kontForma.classList.add("kontejner");
        kontForma.classList.add("veciKontejner");
        kontForma.id = "registracija";
        host.appendChild(kontForma);

        var elLabela = document.createElement("h3");
        elLabela.innerHTML = "Pretraga ljubimaca";
        kontForma.appendChild(elLabela);

        //JMBG vlasnika:   
        elLabela = document.createElement("label");
        elLabela.innerHTML = "<br/>Vas JMBG: ";
        elLabela.classList.add("required");
        kontForma.appendChild(elLabela);
        
        let tb = document.createElement("input");
        tb.className = "tbx";
        tb.classList.add("jmbg");
        tb.type = "number";
        tb.maxLength = 13;
        tb.minLength = 13;
        kontForma.appendChild(tb);

        //Dugme:
        const dugme = document.createElement("button");
        dugme.innerHTML = "Prikazi ljubimce";
        dugme.className = "dugme";
        kontForma.appendChild(dugme);
        dugme.onclick=(ev)=>
        {
            pomDiv.hidden = true;
            var ljubimacInfo = pomDiv.querySelector(".ljubimacInfo");

            console.log(ljubimacInfo);

            if(ljubimacInfo != undefined)   //cisto da bi bilo lepse, da se ne bi prikazivao ako se ucita jedan jmbg pa onda drugi
                ljubimacInfo.remove();

            let jmbg = parseInt(kontForma.querySelector(".jmbg").value);

            console.log("jmbg: " + jmbg);

            fetch(`https://localhost:5001/Ljubimac/PreuzmiLjubimce/${jmbg.toString()}`).then(p => 
            {
                    var nizLjubimaca = [];

                    p.json().then(data => 
                        {
                            if(data.length == 0)
                            {
                                pomDiv.hidden = true;

                                return;
                            }

                            pomDiv.hidden = false;
                            
                            var opcije = document.querySelectorAll(".opcija");
                                    
                            if(opcije != null)
                                opcije.forEach(o => o.remove());

                            data.forEach(ljubimac => 
                                {
                                    nizLjubimaca.push(new Ljubimac(ljubimac.id, ljubimac.jmbgVlasnika, ljubimac.ime, ljubimac.vrsta, ljubimac.datumRodjenja, ljubimac.pol, ljubimac.brojCipa));

                                    var opcija = document.createElement("option");
                                    opcija.innerHTML = ljubimac.ime;
                                    opcija.value = ljubimac.id;
                                    console.log(ljubimac.id);
                                    opcija.className = "opcija";
                                    sel.appendChild(opcija);

                                    sel.selectedIndex = -1;     //zato sto onchange nece da selektuje odmah 0. opciju jer tehnicki nije changed
                                    
                                    sel.onchange=(ev)=>  
                                    {
                                        var lj = nizLjubimaca.find(x => x.ID == sel.value);

                                        console.log(lj);

                                        ljubimacInfo = document.querySelector(".ljubimacInfo");

                                        if(ljubimacInfo != null)
                                        {
                                            console.log("NIJE NUL BRAT LUDI");
                                            ljubimacInfo.remove();

                                        }

                                        ljubimacInfo = document.createElement("div");
                                        ljubimacInfo.classList.add("ljubimacInfo");

                                        var ljubimacInfoSmol = document.createElement("div");
                                        ljubimacInfoSmol.classList.add("ljubimacInfoSmol");

                                        prveKontrole(ljubimacInfoSmol, lj, "D");

                                        ljubimacInfo.appendChild(ljubimacInfoSmol);
                                    
                                        ljubimacInfoSmol = document.createElement("div");
                                        ljubimacInfoSmol.classList.add("ljubimacInfoSmol");

                                        drugeKontrole(ljubimacInfoSmol, lj, "D");

                                        //DUGMICI:
                                        var dugmici = document.createElement("div");
                                        dugmici.classList.add("dugmici");

                                        host.appendChild(dugmici);

                                        crtajDugmice(dugmici, lj);

                                        ljubimacInfoSmol.appendChild(dugmici);

                                        ljubimacInfo.appendChild(ljubimacInfoSmol);

                                        pomDiv.appendChild(ljubimacInfo);
                                    }
                                }
                            )
                        }
                    )

                    
            }

            )
        }

        var pomDiv = document.createElement("div");
        pomDiv.className = "pomDiv";
        pomDiv.hidden = true;

        var sel = document.createElement("select");
        var labela = document.createElement("label");
        labela.innerHTML = "<br/><br/>Ljubimci: ";
        sel.className = "tbx";

        pomDiv.appendChild(labela);
        pomDiv.appendChild(sel);

        kontForma.appendChild(pomDiv);
    }

    function ucitajAmbulante()
    {
        fetch("https://localhost:5001/Ambulanta/PreuzmiAmbulante")
        .then(p => 
                {
                    p.json().then(data => 
                        {
                            data.forEach(ambulanta => 
                                {
                                    const a1 = new Ambulanta(ambulanta.id, ambulanta.naziv, ambulanta.pocetakRada, ambulanta.brojSati, ambulanta.brojTerminaPoSatu);
                                    
                                    ambulanta.veterinari.forEach( v => a1.dodajVeterinara(new Veterinar(v.id, v.ime, v.prezime, v.datumRodjenja, v.pol, v.strucnaSprema, v.putanjaDoSlike)))
                                    
                                    a1.crtajAmbulantu(document.body);
    
                                    ambulanta.termini.forEach( t => 
                                        {
                                            var indeks = (t.sati - ambulanta.pocetakRada) * ambulanta.brojTerminaPoSatu + t.minuti / (60 / ambulanta.brojTerminaPoSatu);
    
                                            a1.Termini[indeks].ID = t.id;
    
                                            a1.Termini[indeks].azurirajTermin();

                                            console.log(t);
                                        } 
                                        )
                                });
                        });
                }
            )
    }

    ucitajAmbulante();

    crtajFormuRegistracija(kontZaLjubimce);
    crtajFormuPretraga(kontZaLjubimce);

/*const a1 = new Ambulanta("Prva ambulanta", 7, 8, 2, 3);
a1.crtajAmbulantu(document.body);

const a2 = new Ambulanta("Druga ambulanta", 8, 6, 3, 2);
a2.crtajAmbulantu(document.body);

const a3 = new Ambulanta("Treca ambulanta", 10, 6, 4, 2);
a3.crtajAmbulantu(document.body);

const a4 = new Ambulanta("Cetvrta ambulanta", 11, 5, 5, 3);
a4.crtajAmbulantu(document.body);



const v1 = new Veterinar("IME1", "PREZIME1", "21-Aug-2021", 'z', "SPREMA", "./images/1.jfif");
const v2 = new Veterinar("IME2", "PREZIME2", "21-Aug-2021", 'm', "SPREMA", "./images/3.jfif");
const v3 = new Veterinar("IME3", "PREZIME3", "21-Aug-2021", 'z', "SPREMA", "./images/2.jfif");
const v4 = new Veterinar("IME4", "PREZIME4", "21-Aug-2021", 'm', "SPREMA", "./images/3.jfif");
const v5 = new Veterinar("IME5", "PREZIME5", "21-Aug-2021", 'z', "SPREMA", "./images/2.jfif");
const v6 = new Veterinar("IME6", "PREZIME6", "21-Aug-2021", 'm', "SPREMA", "./images/3.jfif");
const v7 = new Veterinar("IME7", "PREZIME7", "21-Aug-2021", 'm', "SPREMA", "./images/3.jfif");


a1.dodajVeterinara(v1);
a2.dodajVeterinara(v2);
a2.dodajVeterinara(v3);
a3.dodajVeterinara(v4);
a3.dodajVeterinara(v5);
a4.dodajVeterinara(v6);
a4.dodajVeterinara(v7);
a1.crtajVeterinare(a1.Kontejner);
a2.crtajVeterinare(a2.Kontejner);
a3.crtajVeterinare(a3.Kontejner);
a4.crtajVeterinare(a4.Kontejner);*/



    
