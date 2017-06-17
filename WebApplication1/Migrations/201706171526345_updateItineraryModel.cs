namespace WebApplication1.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateItineraryModel : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Itineraries", "ItineraryName", c => c.String());
            AddColumn("dbo.Itineraries", "ItineraryDate", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Itineraries", "ItineraryDate");
            DropColumn("dbo.Itineraries", "ItineraryName");
        }
    }
}
