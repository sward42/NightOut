app.controller("CrawlMapController",
    ["$scope", "$rootScope", "$http", "$location", "GoogleMapsFactory",
    function ($scope, $rootScope, $http, $location, GoogleMapsFactory) {
        
        console.log($rootScope.myStops);
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

        function calculateAndDisplayRoute(directionsService, directionsDisplay, myStops) {
            var waypts = [];
            
            for (var i = 1; i < myStops.length-1; i++) {
               
                    waypts.push({
                        location: `place_id:${myStops.PlaceId}`,
                        stopover: true
                    });
            }

            var end = $rootScope.myStops.length -1;
            $scope.startPoint = $rootScope.myStops[0].PlaceId;
            $scope.endPoint = $rootScope.myStops[end].PlaceId;

            directionsService.route({
                origin: `place_id:${$scope.startPoint}`,
                destination: `place_id:${$scope.endPoint}`,
                waypoints: waypts,
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