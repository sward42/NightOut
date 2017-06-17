using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.DAL.Interfaces
{
    public interface IItineraryRepository
    {
        void SaveItinerary(Itinerary itinerary);
        IEnumerable<Itinerary> GetAllItineraries();
        void DeleteItinerary(int itineraryId);
        void UpdateItinerary(Itinerary newItinerary);
        Itinerary GetSingleItinerary(int id);
    }
}
