app.controller("WestEndController",
    ["$scope", "$rootScope", "$http", "$location", "GoogleMapsFactory",
    function ($scope, $rootScope, $http, $location, GoogleMapsFactory) {

        $scope.neighborhoodSelect = "West End";
        $('#pac-input').focus();

        function initAutocomplete() {
            $scope.map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 36.1627, lng: -86.7816 },
                zoom: 14,
                mapTypeId: 'roadmap'
            });

            //geo location
            var infoWindow = new google.maps.InfoWindow({ map: $scope.map });
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    infoWindow.setPosition(pos);
                    infoWindow.setContent('Location found.');
                    $scope.map.setCenter(pos);
                }, function () {
                    //handleLocationError(true, infoWindow, $scope.map.getCenter());
                });
            } else {
                // Browser doesn't support Geolocation
                //handleLocationError(false, infoWindow, $scope.map.getCenter());
            }


            // Create the search box and link it to the UI element.
            var input = document.getElementById('pac-input');
            var searchBox = new google.maps.places.SearchBox(input);
            $scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            // Bias the SearchBox results towards current map's viewport.
            $scope.map.addListener('bounds_changed', function () {
                searchBox.setBounds($scope.map.getBounds());
            });

            $scope.markers = [];
            $scope.places = [];

            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.
            searchBox.addListener('places_changed', function () {
                $scope.places = searchBox.getPlaces();
                $scope.$apply();
                console.log("places", $scope.places); //go information to dive into
                if ($scope.places.length === 0) {
                    return;
                }

                // Clear out the old markers.
                $scope.markers.forEach(function (marker) {
                    marker.setMap(null);
                });
                //$scope.markers = [];

                // For each place, get the icon, name and location.
                var bounds = new google.maps.LatLngBounds();
                $scope.places.forEach(function (place) {
                    if (!place.geometry) {
                        console.log("Returned place contains no geometry");
                        return;
                    }
                    var icon = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                    };

                    // Create a marker for each place.
                    $scope.markers.push(new google.maps.Marker({
                        map: $scope.map,
                        icon: icon,
                        title: place.name,
                        position: place.geometry.location,
                        draggable: true
                    }));
                    //console.log("markers", $scope.markers);

                    if (place.geometry.viewport) {
                        // Only geocodes have viewport.
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }
                });
                $scope.map.fitBounds(bounds);
                console.log("map scope", $scope.map);
            });
        }

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                                  'Error: The Geolocation service failed.' :
                                  'Error: Your browser doesn\'t support geolocation.');
        }

        initAutocomplete();


        $scope.addDestination = function (place) {

            console.log("neighborhoodSelect", $scope.neighborhoodSelect);

            console.log("place", place)
            $http({
                url: '/api/destination',
                method: 'post',
                data: {
                    Name: place.name,
                    Address: place.formatted_address,
                    PlaceId: place.place_id,
                    Rating: place.rating,
                    PriceLevel: place.price_level,
                    Neighborhood: $scope.neighborhoodSelect

                }
            })

            .then(function (result) {
                console.log("save result", result)
            });
        };

        $scope.itineraryPage = function () {
            $location.path("/itinerary");
        }
    }

    ]);