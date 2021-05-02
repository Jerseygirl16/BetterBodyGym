var accountID = localStorage.getItem("accountID");
console.log(accountID);

var app = angular.module("viewBreakfast", []);

app.controller("viewBreakfast", function($scope, $http){
    $scope.hideOatPancakes = true;
    $scope.hideSecNavBar = false;
    $scope.hideBreakfastRecipes = true;
    
    $scope.showOatPancakes = function(){
        $scope.hideOatPancakes = false;
        $scope.hideSecNavBar = true;
        $scope.hideBreakfastRecipes = false;
    };
});