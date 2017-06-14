using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.Models;

namespace WebApplication1.DAL.Repositories
{
    public class ItineraryRepository
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
            return _context.Itineraries;
        }

        public void SaveItinerary(Itinerary itinerary)
        {
            _context.Itineraries.Add(itinerary);
            _context.SaveChanges();
        }
        public Itinerary GetSingleItinerary(int id)
        {
            return _context.Itineraries.Find(id);
        }
    }
}