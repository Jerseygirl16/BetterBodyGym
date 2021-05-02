var accountID = localStorage.getItem("accountID");
console.log(accountID);

var app = angular.module("viewDesserts", []);

app.controller("viewDesserts", function($scope, $http){
    $scope.hideStrawberrySorbet = true;
    $scope.hideSecNavBar = false;
    $scope.hideDessertRecipes = true;
    
    $scope.showStrawberrySorbet = function(){
        $scope.hideStrawberrySorbet = false;
        $scope.hideSecNavBar = true;
        $scope.hideDessertRecipes = false;
    };
});