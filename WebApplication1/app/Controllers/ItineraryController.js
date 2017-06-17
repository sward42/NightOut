app.controller("ItineraryController",
    ["$scope", "$rootScope", "$http", "$location", "GoogleMapsFactory",
    function ($scope, $rootScope, $http, $location, GoogleMapsFactory) {
       
        $rootScope.myStops = [];
        $scope.myItinerary = {};

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

        $scope.getMyPlaces();


            $scope.addStop = function (destination) {
                $rootScope.myStops.push(destination);
                console.log("myStops", $rootScope.myStops);
            }


            $scope.deletePlace = function (id) {
                $http({
                    url: `/api/destination/${id}`,
                    method: 'delete',
                })
                .then(function successCallback(response) {
                    console.log("item deleted")
                    ;
                    $scope.getMyPlaces();
                },
                function errorCallback(response) {
                    console.log("error", response);
                });
            }


            $scope.saveMyItinerary = function (myStops, myItinerary) {
                for (var i = 1; i <= myStops.length; i++) {
                    myItinerary['Stop'+i] = myStops[i-1].Id;

                }
                console.log("my itinerary", $scope.myItinerary);

                $http.post('api/itinerary', myItinerary)
                .then(function successCallback(response) {
                    console.log("item added");
                },
                function errorCallback(response) {
                    console.log("error", response);
                });
            }


            $scope.goToCrawlMap = function () {
                $location.path("/crawlMap");
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


