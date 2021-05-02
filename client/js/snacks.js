var accountID = localStorage.getItem("accountID");
console.log(accountID);

var app = angular.module("viewSnacks", []);

app.controller("viewSnacks", function($scope, $http){
    $scope.hideHummus = true;
    $scope.hideSecNavBar = false;
    $scope.hideSnackRecipes = true;
    
    $scope.showHummus = function(){
        $scope.hideHummus = false;
        $scope.hideSecNavBar = true;
        $scope.hideSnackRecipes = false;
    };
});