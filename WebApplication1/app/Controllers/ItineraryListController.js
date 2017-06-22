app.controller("ItineraryListController", ["$scope", "$rootScope", "$http", "$location",
    function ($scope, $rootScope, $http, $location) {

        $scope.myItineraries = [];

        $scope.itineraryDetail = false;

        $scope.getMyItineraries = function () {
            $http({
                url: '/api/itinerary',
                method: 'get',
            })
            .then(function successCallback(response) {
                console.log("save result", response)
                $scope.myItineraries = response.data;
                console.log("response", $scope.myItineraries);

            },
            function errorCallback(response) {
                console.log("error", response);
            });
        }
        $scope.getMyItineraries();

        $scope.deleteItinerary = function (id) {
            $http({
                url: `/api/itinerary/${id}`,
                method: 'delete',
            })
            .then(function successCallback(response) {
                console.log("item deleted")
                ;
                $scope.getMyItineraries();
            },
            function errorCallback(response) {
                console.log("error", response);
            });
        }

    }
]);