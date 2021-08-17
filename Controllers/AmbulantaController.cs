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
    public class AmbulantaController : ControllerBase
    {
        public AmbulanteContext Context { get; set; }

        public AmbulantaController(AmbulanteContext context)
        {
            Context = context;
        }

        //AMBULANTE-------------------------------------------------------------------
        [Route("PreuzmiAmbulante")]
        [HttpGet]
        public async Task<List<Ambulanta>> GetAmbulante()
        {
            return await Context.Ambulante.Include(p => p.Veterinari).Include(p => p.Termini).ToListAsync();
        }

        [Route("PreuzmiAmbulantu/{id}")]
        [HttpGet]
        public async Task<Ambulanta> GetAmbulanta(int id)
        {
            return await Context.Ambulante.FindAsync(id);
        }

        [Route("UpisiAmbulantu")]
        [HttpPost]
        public async Task PostAmbulanta([FromBody] Ambulanta x)
        {
            Context.Ambulante.Add(x);

            await Context.SaveChangesAsync();
        }

        [Route("IzmeniAmbulantu")]
        [HttpPut]
        public async Task PutAmbulanta([FromBody] Ambulanta x)
        {
            Context.Update<Ambulanta>(x);

            await Context.SaveChangesAsync();
        }

        [Route("IzbrisiAmbulantu/{id}")]
        [HttpDelete]
        public async Task DeleteAmbulanta(int id)
        {
            var x = await Context.Ambulante.FindAsync(id);

            Context.Remove(x);

            await Context.SaveChangesAsync();
        }
        //AMBULANTE END-------------------------------------------------------------------
    }
}
