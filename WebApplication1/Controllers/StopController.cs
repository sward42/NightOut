using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.DAL.Interfaces;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class StopController : ApiController
    {
        private readonly IStopRepository _stopRepository;
        public StopController(IStopRepository stopRepository)
        {
            _stopRepository = stopRepository;
        }

        [Route("api/stop")]
        [HttpPost]
        public void AddStop(Stop newStop)
        {
            _stopRepository.SaveStop(newStop);

        }

        [Route("api/stop")]
        [HttpGet]
        public IEnumerable<Stop> GetStops()
        {
            return _stopRepository.GetAllStops().ToList();
        }

        [Route("api/stop/{id}")]
        [HttpGet]
        public Stop GetStopById(int id)
        {
            return _stopRepository.GetSingleStop(id);
        }

        [Route("api/stop/{id}")]
        [HttpDelete]
        public void DeleteSingleStop(int id)
        {
            _stopRepository.DeleteStop(id);
        }
    }
}
