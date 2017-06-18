﻿var app = angular.module("NightOut", ["ngRoute"]);

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

}])


app.run(["$http", function ($http) {

    var token = sessionStorage.getItem('token');

    if (token)
        $http.defaults.headers.common['Authorization'] = `bearer ${token}`;

}
]);