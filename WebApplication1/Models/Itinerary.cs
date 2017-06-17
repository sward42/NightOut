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
        public int Stop1 { get; set; }
        public int Stop2 { get; set; }
        public int Stop3 { get; set; }
        public int Stop4 { get; set; }
        public int Stop5 { get; set; }
        public int Stop6 { get; set; }
        public int Stop7 { get; set; }
        public int Stop8 { get; set; }
        public int Stop9 { get; set; }
        public int Stop10 { get; set; }
    }
}