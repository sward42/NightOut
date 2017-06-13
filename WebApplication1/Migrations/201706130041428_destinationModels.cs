namespace WebApplication1.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class destinationModels : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Destinations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Address = c.String(),
                        PlaceId = c.String(),
                        Rating = c.Double(nullable: false),
                        PriceLevel = c.Int(nullable: false),
                        Neighborhood = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Itineraries",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Stop1 = c.Int(nullable: false),
                        Stop2 = c.Int(nullable: false),
                        Stop3 = c.Int(nullable: false),
                        Stop4 = c.Int(nullable: false),
                        Stop5 = c.Int(nullable: false),
                        Stop6 = c.Int(nullable: false),
                        Stop7 = c.Int(nullable: false),
                        Stop8 = c.Int(nullable: false),
                        Stop9 = c.Int(nullable: false),
                        Stop10 = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Itineraries");
            DropTable("dbo.Destinations");
        }
    }
}
