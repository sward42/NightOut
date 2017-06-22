namespace WebApplication1.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class itineraryStopUpdate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Destinations", "Itinerary_Id", c => c.Int());
            CreateIndex("dbo.Destinations", "Itinerary_Id");
            AddForeignKey("dbo.Destinations", "Itinerary_Id", "dbo.Itineraries", "Id");
            DropColumn("dbo.Itineraries", "Stop1");
            DropColumn("dbo.Itineraries", "Stop2");
            DropColumn("dbo.Itineraries", "Stop3");
            DropColumn("dbo.Itineraries", "Stop4");
            DropColumn("dbo.Itineraries", "Stop5");
            DropColumn("dbo.Itineraries", "Stop6");
            DropColumn("dbo.Itineraries", "Stop7");
            DropColumn("dbo.Itineraries", "Stop8");
            DropColumn("dbo.Itineraries", "Stop9");
            DropColumn("dbo.Itineraries", "Stop10");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Itineraries", "Stop10", c => c.Int(nullable: false));
            AddColumn("dbo.Itineraries", "Stop9", c => c.Int(nullable: false));
            AddColumn("dbo.Itineraries", "Stop8", c => c.Int(nullable: false));
            AddColumn("dbo.Itineraries", "Stop7", c => c.Int(nullable: false));
            AddColumn("dbo.Itineraries", "Stop6", c => c.Int(nullable: false));
            AddColumn("dbo.Itineraries", "Stop5", c => c.Int(nullable: false));
            AddColumn("dbo.Itineraries", "Stop4", c => c.Int(nullable: false));
            AddColumn("dbo.Itineraries", "Stop3", c => c.Int(nullable: false));
            AddColumn("dbo.Itineraries", "Stop2", c => c.Int(nullable: false));
            AddColumn("dbo.Itineraries", "Stop1", c => c.Int(nullable: false));
            DropForeignKey("dbo.Destinations", "Itinerary_Id", "dbo.Itineraries");
            DropIndex("dbo.Destinations", new[] { "Itinerary_Id" });
            DropColumn("dbo.Destinations", "Itinerary_Id");
        }
    }
}
