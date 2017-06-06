app.controller("HomeController", ["$scope", "$http", "$location",
    function ($scope, $http, $location) {
        
        $scope.logout = function () {

            sessionStorage.removeItem('token');
            $http.defaults.headers.common['Authorization'] = "";

            $location.path("/login");
        }
    }
]);