var accountID = localStorage.getItem("accountID");
console.log(accountID);

var app = angular.module("viewSalads", []);

app.controller("viewSalads", function($scope, $http){
    $scope.hideTurkeySalad = true;
    $scope.hideSecNavBar = false;
    $scope.hideSaladRecipes = true;
    
    $scope.showSaladRecipes = function(){
        $scope.hideTurkeySalad  = false;
        $scope.hideSecNavBar = true;
        $scope.hideSaladRecipes = false;
    };
});