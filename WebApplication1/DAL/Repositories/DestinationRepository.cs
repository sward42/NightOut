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
        public void DeleteDestination(int destinationId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Destination> GetAllDestinations()
        {
            throw new NotImplementedException();
        }

        public void SaveDestination(Destination destination)
        {
            throw new NotImplementedException();
        }
    }
}