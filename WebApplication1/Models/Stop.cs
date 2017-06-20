using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class Stop
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PlaceId { get; set; }
        public double Rating { get; set; }
        public int PriceLevel { get; set; }
        public string Neighborhood { get; set; }
        public int ItineraryId { get; set; }
    }
}