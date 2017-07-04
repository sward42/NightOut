app.controller("DestinationListController",
    ["$scope", "$rootScope", "$http", "$location", "GoogleMapsFactory",
    function ($scope, $rootScope, $http, $location, GoogleMapsFactory) {

        $rootScope.showNavbar();

        $scope.searchText = "";

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

        $scope.clear = function () {
            document.getElementById('search').value = "";
            $scope.searchText = "";
        }

    }

]);