using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.DAL.Interfaces
{
    interface IDestinationRepository
    {
        void SaveDestination(Destination destination);
        IEnumerable<Destination> GetAllDestinations();
        void DeleteDestination(int destinationId);
    }
}
