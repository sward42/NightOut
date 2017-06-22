using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.DAL.Interfaces;
using WebApplication1.Models;

namespace WebApplication1.DAL.Repositories
{
    public class ItineraryRepository : IItineraryRepository
    {
        private readonly ApplicationDbContext _context;
        public ItineraryRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public void DeleteItinerary(int id)
        {
            var itineraryToDelete = GetSingleItinerary(id);
            _context.Itineraries.Remove(itineraryToDelete);
            _context.SaveChanges();
        }

        public IEnumerable<Itinerary> GetAllItineraries()
        {
            var destinations = _context.Destinations;
            return _context.Itineraries;
        }

        public int SaveItinerary(Itinerary itinerary)
        {
            _context.Itineraries.Add(itinerary);
            _context.SaveChanges();

            return itinerary.Id;
        }
        public Itinerary GetSingleItinerary(int id)
        {
            return _context.Itineraries.Find(id);
        }
      
        public void UpdateItinerary(Itinerary newItinerary)
        {
            throw new NotImplementedException();
        }
    }
}