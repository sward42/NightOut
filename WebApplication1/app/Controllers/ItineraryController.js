app.controller("ItineraryController",
    ["$scope", "$rootScope", "$http", "$location", "GoogleMapsFactory",
    function ($scope, $rootScope, $http, $location, GoogleMapsFactory) {
       
        $rootScope.myStops = [];
        $scope.response = [];
        $scope.myItinerary = {};

        $scope.searchText = "";
        $scope.myRoute = false;
        $scope.selectPlaces = false;

        $scope.getMyPlaces = function () {
            $http({
                url: '/api/destination',
                method: 'get',
            })
            .then(function successCallback(response) {
                console.log("save result", response)
                $scope.response = response.data;
                console.log("response", $scope.response);

            },
            function errorCallback(response) {
                console.log("error", response);
            });
        }


        $scope.saveNewStop = function (place) {
            $http({
                url: '/api/stop',
                method: 'post',
                data: {
                    Name: place.Name,
                    Address: place.Address,
                    PlaceId: place.PlaceId,
                    Rating: place.Rating,
                    PriceLevel: place.PriceLevel,
                    Neighborhood: place.Neighborhood,
                    ItineraryId: $scope.myItinerary.Id

                }
            })
            .then(function successCallback(response) {
                console.log("stop added");
            },
            function errorCallback(response) {
                console.log("error", response);
            });

        }


        $scope.deleteStop = function (id) {
            $http.delete(`api/stop/${id}`)
            .then(function successCallback(response) {
                console.log("stop deleted");
            },
            function errorCallback(response) {
                console.log("error", response);
            });
        }


        $scope.addStop = function (place) {
            $scope.saveNewStop(place);

            $rootScope.myStops.push(place);

            for (var i = 0; i < $scope.response.length ; i++) {
                if ($scope.response[i].Id == place.Id) {
                    $scope.response.splice(i, 1);
                    return false;
                }
            }
        }

        $scope.removeStop = function (stop) {
            $scope.deleteStop(stop.Id);

            for (var i = 0; i < $rootScope.myStops.length ; i++) {
                if ($rootScope.myStops[i].Id == stop.Id) {
                    $rootScope.myStops.splice(i, 1);
                    $scope.response.push(stop);
                    return false;
                } 
            }
            console.log($scope.response);
        }

            $scope.saveMyItinerary = function (myItinerary) {

                if (!myItinerary.ItineraryName || !myItinerary.ItineraryDate) {
                    alert("Please enter a name and date for your itinerary.")
                } else {
                    console.log("my itinerary", $scope.myItinerary);

                    $http.post('api/itinerary', myItinerary)
                    .then(function successCallback(response) {
                        console.log("item added", response);
                        $scope.myItinerary.Id = response.data;
                    },
                    function errorCallback(response) {
                        console.log("error", response);
                    });
                }
           }
            

            $scope.clear = function () {
                document.getElementById('search').value = "";
                $scope.searchText = "";
            }

            $scope.goToCrawlMap = function () {
                $location.path("/crawlMap");
            }

            $scope.addPlaces = function () {
                $scope.selectPlaces = true;
                $scope.getMyPlaces();
            }

            $scope.showMap = function () {
                $scope.myRoute = true;
            }

////////////////

            console.log("myStops2",$rootScope.myStops);
            function initMap() {
                var directionsService = new google.maps.DirectionsService;
                var directionsDisplay = new google.maps.DirectionsRenderer;
                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 6,
                    center: { lat: 36.1627, lng: -86.7816 }
                });
                directionsDisplay.setMap(map);

                document.getElementById('submit').addEventListener('click', function () {
                    calculateAndDisplayRoute(directionsService, directionsDisplay, $rootScope.myStops);
                });
            }

            $scope.waypts = [];

            function calculateAndDisplayRoute(directionsService, directionsDisplay, myStops) {

                for (var i = 1; i < myStops.length - 1; i++) {

                    $scope.waypts.push({
                        location: `place_id:${myStops[i].PlaceId}`,
                        stopover: true
                    });
                    
                }

                var end = $rootScope.myStops.length - 1;
                $scope.startPoint = $rootScope.myStops[0].PlaceId;
                $scope.endPoint = $rootScope.myStops[end].PlaceId;

                console.log("waypts", $scope.waypts);
                console.log("startPoint", $scope.startPoint);
                console.log("endPoint", $scope.endPoint);

                directionsService.route({
                    origin: `place_id:${$scope.startPoint}`,
                    destination: `place_id:${$scope.endPoint}`,
                    waypoints: $scope.waypts,
                    optimizeWaypoints: true,
                    travelMode: 'DRIVING'
                }, function (response, status) {
                    if (status === 'OK') {
                        directionsDisplay.setDirections(response);
                        var route = response.routes[0];
                        var summaryPanel = document.getElementById('directions-panel');
                        summaryPanel.innerHTML = '';
                        // For each route, display summary information.
                        for (var i = 0; i < route.legs.length; i++) {
                            var routeSegment = i + 1;
                            summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
                                '</b><br>';
                            summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                            summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                            summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
                        }
                    } else {
                        window.alert('Directions request failed due to ' + status);
                    }
                });
            }

            initMap();

    }
    ]);


//if (myStops.length > 10 || myStops.lenth < 3) {
//    alert("Your itinerary must have at least 3 but no more than 10 stops.");
//} else if (!myItinerary.ItineraryName || !myItinerary.ItineraryDate ) {
//    alert("Please enter a name and date for your itinerary.");
//} else {

//    for (var i = 1; i <= myStops.length; i++) {
//        myItinerary['Stop' + i] = myStops[i - 1].Id;

//    }