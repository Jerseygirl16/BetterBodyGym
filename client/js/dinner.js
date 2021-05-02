var accountID = localStorage.getItem("accountID");
console.log(accountID);

var app = angular.module("viewDinner", []);

app.controller("viewDinner", function($scope, $http){
    $scope.hideChickenDinner = true;
    $scope.hideSecNavBar = false;
    $scope.hideDinnerRecipes = true;
    
    $scope.showChickenDinner = function(){
        $scope.hideChickenDinner = false;
        $scope.hideSecNavBar = true;
        $scope.hideDinnerRecipes = false;
    };
});