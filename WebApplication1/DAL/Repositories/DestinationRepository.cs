using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.DAL.Interfaces;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class DestinationRepository : IDestinationRepository
    {
        private readonly ApplicationDbContext _context;
        public DestinationRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public void DeleteDestination(int destinationId)
        {
            var destinationToDelete = GetSingleDestination(destinationId);
            _context.Destinations.Remove(destinationToDelete);
            _context.SaveChanges();
        }

        public IEnumerable<Destination> GetAllDestinations()
        {
            return _context.Destinations;
        }

        public void SaveDestination(Destination destination)
        {
            _context.Destinations.Add(destination);
            _context.SaveChanges();
        }
        public Destination GetSingleDestination (int destinationId)
        {
            return _context.Destinations.Find(destinationId);
        }
    }
}