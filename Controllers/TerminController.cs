using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WebProjekat17172.Models;

namespace WebProjekat17172.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TerminController : ControllerBase
    {
        public AmbulanteContext Context { get; set; }

        public TerminController(AmbulanteContext context)
        {
            Context = context;
        }

        //TERMINI-------------------------------------------------------------------
        [Route("PreuzmiTermine")]
        [HttpGet]
        public async Task<List<Termin>> GetTermini()
        {
            return await Context.Termini.ToListAsync();
        }

        [Route("PreuzmiTermin/{id}")]
        [HttpGet]
        public async Task<Termin> GetTermin(int id)
        {
            return await Context.Termini.Include(p => p.Ljubimac).Where(x => x.ID == id).FirstAsync();
        }

        [Route("PreuzmiTermineAmbulante/{id}")]
        [HttpGet]
        public async Task<List<Termin>> GetTermini(int id)
        {
            var x = await Context.Ambulante.Where(i => i.ID == id).FirstOrDefaultAsync();

            return x.Termini;
        }

        [Route("UpisiTermin/{idAmbulante}&{idvet}&{idljubimac}")]
        [HttpPost]
        public async Task PostTermin(int idAmbulante, int idvet, int idljubimac, [FromBody] Termin x)
        {
            var ambulanta = await Context.Ambulante.FindAsync(idAmbulante);

            var vet = await Context.Veterinari.FindAsync(idvet);

            var ljubimac = await Context.Ljubimci.FindAsync(idljubimac);

            x.Ljubimac = ljubimac;

            x.Veterinar = vet;

            x.Ambulanta = ambulanta;

            Context.Termini.Add(x);

            await Context.SaveChangesAsync();
        }

        [Route("IzmeniTermin")]
        [HttpPut]
        public async Task PutTermin([FromBody] Termin x)
        {
            Context.Update<Termin>(x);

            await Context.SaveChangesAsync();
        }

        [Route("IzbrisiTermin/{id}")]
        [HttpDelete]
        public async Task DeleteTermin(int id)
        {
            var x = await Context.Termini.FindAsync(id);

            Context.Remove(x);

            await Context.SaveChangesAsync();
        }
        //TERMINI END-------------------------------------------------------------------
    }
}
