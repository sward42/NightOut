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
    public class DestinationController : ApiController
    {
        private readonly IDestinationRepository _destinationRepository;
        public DestinationController(IDestinationRepository destinationRepository)
        {
            _destinationRepository = destinationRepository;
        }

        [Route ("api/destination")]
        [HttpPost]
        public void AddDestination(Destination newDestination)
        {
            _destinationRepository.SaveDestination(newDestination);

        }

        [Route ("api/destination")]
        [HttpGet]
        public IEnumerable<Destination> GetDestinations()
        {
            return _destinationRepository.GetAllDestinations().ToList();
        }

        [Route ("api/destination/{id}")]
        [HttpGet]
        public Destination GetDestinationById(int id)
        {
            return _destinationRepository.GetSingleDestination(id);
        }

        [Route ("api/destination/{id}")]
        [HttpDelete]
        public void DeleteSingleDestination(int id)
        {
            _destinationRepository.DeleteDestination(id);
        }
    }
}
