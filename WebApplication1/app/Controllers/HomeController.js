app.controller("HomeController", ["$scope", "$http", "$location",
    function ($scope, $http, $location) {
        
        var page = 0;
        $scope.barData = [];

        $scope.logout = function () {

            sessionStorage.removeItem('token');
            $http.defaults.headers.common['Authorization'] = "";

            $location.path("/login");
        }

        $scope.getMap = function () {
            $location.path("/crawlMap");
        }

        $scope.searchApi = function () {
            $.ajax({
                url: "https://data.nashville.gov/resource/p4jz-kk7d.json?permit_type=ON-SALE BEER",
                type: "GET",
                data: {
                    "$limit": 2000,
                    "$offset": page,
                    "$$app_token": "DDXDoahFcWHyIB0UmY06BKAwl"
                }
            }).done(function (data) {
                var list = [];
                Object.keys(data).forEach(function (key) {
                    var id = parseInt(page) + parseInt(key);
                    data[key].id = id;
                    list.push(data[key]);
                });
                $scope.barData = $scope.barData.concat(list);
                $scope.$apply();
                console.log("barData", data);
            });
        }
    }
]);