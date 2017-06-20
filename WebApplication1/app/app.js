var app = angular.module("NightOut", ["ngRoute"]);

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/",
        {
            templateUrl: "app/Partials/login.html",
            controller: "LoginController"
        })
        .when("/home",
        {
            templateUrl: "app/Partials/home.html",
            controller: "HomeController"
        })
        .when("/signup",
        {
            templateUrl: "app/Partials/signup.html",
            controller: "SignUpController"
        })
        .when("/login",
        {
            templateUrl: "app/Partials/login.html",
            controller: "LoginController"
        })
        .when("/searchMap",
        {
            templateUrl: "app/Partials/searchMap.html",
            controller: "SearchMapController"
        })
        .when("/crawlMap",
        {
            templateUrl: "app/Partials/crawlMap.html",
            controller: "CrawlMapController"
        })
/////////////////////  Neighborhood Maps //////////////////////////////
        .when("/12South",
        {
            templateUrl: "app/MapPartials/12South.html",
            controller: "12SouthController"
        })
        .when("/8thAveS",
        {
            templateUrl: "app/MapPartials/8thAveS.html",
            controller: "8thAveSController"
        })
        .when("/berryHill",
        {
            templateUrl: "app/MapPartials/BerryHill.html",
            controller: "BerryHillController"
        })
        .when("/charlotteAve",
        {
            templateUrl: "app/MapPartials/CharlotteAve.html",
            controller: "CharlotteAveController"
        })
        .when("/downtown",
        {
            templateUrl: "app/MapPartials/Downtown.html",
            controller: "DowntownController"
        })
        .when("/eastNashville",
        {
            templateUrl: "app/MapPartials/EastNashville.html",
            controller: "EastNashvilleController"
        })
        .when("/germantown",
        {
            templateUrl: "app/MapPartials/Germantown.html",
            controller: "GermantownController"
        })
        .when("/greenHills",
        {
            templateUrl: "app/MapPartials/GreenHills.html",
            controller: "GreenHillsController"
        })
        .when("/gulch",
        {
            templateUrl: "app/MapPartials/Gulch.html",
            controller: "GulchController"
        })
        .when("/hillsboro",
        {
            templateUrl: "app/MapPartials/Hillsboro.html",
            controller: "HillsboroController"
        })
        .when("/midtown",
        {
            templateUrl: "app/MapPartials/Midtown.html",
            controller: "MidtownController"
        })
        .when("/nations",
        {
            templateUrl: "app/MapPartials/Nations.html",
            controller: "NationsController"
        })
        .when("/soBro",
        {
            templateUrl: "app/MapPartials/SoBro.html",
            controller: "SoBroController"
        })
        .when("/westEnd",
        {
            templateUrl: "app/MapPartials/WestEnd.html",
            controller: "WestEndController"
        })
/////////////////////////////////////////////////////////////////
        .when("/itinerary",
        {
            templateUrl: "app/Partials/itinerary.html",
            controller: "ItineraryController"
        })
        .when("/itineraryList",
        {
            templateUrl: "app/Partials/itineraryList.html",
            controller: "ItineraryListController"
        })
        .when("/itineraryDetail/:id",
        {
            templateUrl: "app/Partials/itineraryDetail.html",
            controller: "ItineraryDetailController"
        })
        .when("/destinationList",
        {
            templateUrl: "app/Partials/destinationList.html",
            controller: "DestinationListController"
        })

}])


app.run(["$http", function ($http) {

    var token = sessionStorage.getItem('token');

    if (token)
        $http.defaults.headers.common['Authorization'] = `bearer ${token}`;

}
]);