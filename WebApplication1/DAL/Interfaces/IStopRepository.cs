using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.DAL.Interfaces
{
    public interface IStopRepository
    {
        void SaveStop(Stop stop);
        IEnumerable<Stop> GetAllStops();
        void DeleteStop(int stopId);
        Stop GetSingleStop(int stopId);
    }
}
