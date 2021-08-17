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
    public class VeterinarController : ControllerBase
    {
        public AmbulanteContext Context { get; set; }

        public VeterinarController(AmbulanteContext context)
        {
            Context = context;
        }

        //VETERINARI-------------------------------------------------------------------
        [Route("PreuzmiVeterinare")]
        [HttpGet]
        public async Task<List<Veterinar>> GetVeterinari()
        {
            return await Context.Veterinari.ToListAsync();
        }

        [Route("PreuzmiVeterinara/{id}")]
        [HttpGet]
        public async Task<Veterinar> GetVeterinar(int id)
        {
            return await Context.Veterinari.FindAsync(id);
        }

        /*[Route("PreuzmiVeterinaraPoTerminu/{terminid}")]
        [HttpGet]
        public async Task<Veterinar> GetVeterinarPoTerminu(int terminid)
        {
            var termin = await Context.Termini.Include(x => x.Veterinar).Where(x => x.ID == terminid).FirstOrDefaultAsync();

            return await Context.Veterinari.FindAsync(termin.Veterinar.ID);
        }*/

        [Route("UpisiVeterinara/{ambulantaid}")]
        [HttpPost]
        public async Task PostVeterinar(int ambulantaid, [FromBody] Veterinar x)
        {
            var ambulanta = await Context.Ambulante.FindAsync(ambulantaid);
            
            x.Ambulanta = ambulanta;

            Context.Veterinari.Add(x);

            ambulanta.Veterinari.Add(x);

            await Context.SaveChangesAsync();
        }

        [Route("IzmeniVeterinara")]
        [HttpPut]
        public async Task PutVeterinar([FromBody] Veterinar x)
        {
            Context.Update<Veterinar>(x);

            await Context.SaveChangesAsync();
        }

        [Route("IzbrisiVeterinara/{id}")]
        [HttpDelete]
        public async Task DeleteVeterinar(int id)
        {
            var x = await Context.Veterinari.FindAsync(id);

            Context.Remove(x);

            await Context.SaveChangesAsync();
        }
        //VETERINARI END-------------------------------------------------------------------
    }
}
