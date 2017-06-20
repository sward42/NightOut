app.controller("ItineraryDetailController", ["$scope", "$rootScope", "$http", "$location", "$routeParams",
    function ($scope, $rootScope, $http, $location, $routeParams) {

        $scope.selectedItinerary = {};
        $scope.myStops = [];
        let itineraryId = $routeParams.id;

        $http.get(`api/itinerary/${itineraryId}`)
        .then(function successCallback(response) {
            console.log("single itinerary", response)
            $scope.selectedItinerary = response.data;
        },
         function errorCallback(response) {
             console.log("error", response);
         });
    

        $scope.getMyStops = function () {
            $http({
                url: '/api/stop',
                method: 'get',
            })
            .then(function successCallback(response) {
                console.log("save result", response)
                $scope.myStops = response.data;
                console.log("response", $scope.myStops);

            },
            function errorCallback(response) {
                console.log("error", response);
            });
        }

        $scope.getMyStops();
    }
]);