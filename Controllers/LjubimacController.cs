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
    public class LjubimacController : ControllerBase
    {
        public AmbulanteContext Context { get; set; }

        public LjubimacController(AmbulanteContext context)
        {
            Context = context;
        }

        //LJUBIMCI-------------------------------------------------------------------
        [Route("PreuzmiLjubimce")]
        [HttpGet]
        public async Task<List<Ljubimac>> GetLjubimci()
        {
            return await Context.Ljubimci.ToListAsync();
        }

        [Route("PreuzmiLjubimce/{jmbgosobe}")]
        [HttpGet]
        public async Task<List<Ljubimac>> GetLjubimciJedneOsobe(string jmbgosobe)
        {
            return await Context.Ljubimci.Where(x => x.JMBGVlasnika == jmbgosobe).ToListAsync();
        }

        [Route("PreuzmiLjubimca/{id}")]
        [HttpGet]
        public async Task<Ljubimac> GetLjubimac(int id)
        {
            return await Context.Ljubimci.FindAsync(id);
        }

        [Route("PreuzmiLjubimca/{jmbg}&{ime}")]
        [HttpGet]
        public async Task<Ljubimac> GetLjubimacPoJMBGuIImenu(string jmbg, string ime)
        {
            return await Context.Ljubimci.FirstOrDefaultAsync(i => (i.JMBGVlasnika == jmbg && i.Ime == ime));
        }

        [Route("UpisiLjubimca")]
        [HttpPost]
        public async Task PostLjubimac([FromBody] Ljubimac x)
        {
            Context.Ljubimci.Add(x);

            await Context.SaveChangesAsync();
        }

        [Route("IzmeniLjubimca")]
        [HttpPut]
        public async Task PutAmbulanta([FromBody] Ljubimac x)
        {
            Context.Update<Ljubimac>(x);

            await Context.SaveChangesAsync();
        }

        [Route("IzbrisiLjubimca/{id}")]
        [HttpDelete]
        public async Task DeleteLjubimac(int id)
        {
            var x = await Context.Ljubimci.FindAsync(id);

            Context.Remove(x);

            await Context.SaveChangesAsync();
        }
        //LJUBIMCI END-------------------------------------------------------------------
    }
}
