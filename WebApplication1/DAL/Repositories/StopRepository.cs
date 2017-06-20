using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.DAL.Interfaces;
using WebApplication1.Models;

namespace WebApplication1.DAL.Repositories
{
    public class StopRepository : IStopRepository
    {
        private readonly ApplicationDbContext _context;
        public StopRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public void DeleteStop(int stopId)
        {
            var stopToDelete = GetSingleStop(stopId);
            _context.Stops.Remove(stopToDelete);
            _context.SaveChanges();
        }

        public IEnumerable<Stop> GetAllStops()
        {
            return _context.Stops;
        }

        public Stop GetSingleStop(int stopId)
        {
            return _context.Stops.Find(stopId);
        }

        public void SaveStop(Stop stop)
        {
            _context.Stops.Add(stop);
            _context.SaveChanges();
        }
    }
}