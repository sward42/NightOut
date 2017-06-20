using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class Itinerary
    {
        [Key]
        public int Id { get; set; }
        public string ItineraryName { get; set; }
        public string ItineraryDate { get; set; }
        public List<Destination> DestinationList { get; set; }
    }
}