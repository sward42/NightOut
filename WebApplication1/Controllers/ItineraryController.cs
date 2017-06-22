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
    public class ItineraryController : ApiController
    {
        private readonly IItineraryRepository _itineraryRepository;
        public ItineraryController(IItineraryRepository itineraryRepository)
        {
            _itineraryRepository = itineraryRepository;
        }

        [Route("api/itinerary")]
        [HttpPost]
        public int AddItinerary(Itinerary newItinerary)
        {
            return _itineraryRepository.SaveItinerary(newItinerary);

        }

        [Route("api/itinerary")]
        [HttpGet]
        public IEnumerable<Itinerary> GetItineraries()
        {
            return _itineraryRepository.GetAllItineraries().ToList();
        }

        [Route("api/itinerary/{id}")]
        [HttpGet]
        public Itinerary GetItineraryById(int id)
        {
            return _itineraryRepository.GetSingleItinerary(id);
        }

        [Route("api/itinerary/{id}")]
        [HttpDelete]
        public void DeleteSingleItinerary(int id)
        {
            _itineraryRepository.DeleteItinerary(id);
        }
    }
}
