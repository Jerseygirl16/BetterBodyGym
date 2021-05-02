var accountID = localStorage.getItem("accountID");
console.log(accountID);

var app = angular.module("viewLunch", []);

app.controller("viewLunch", function($scope, $http){
    $scope.hideLettuceWraps = true;
    $scope.hideSecNavBar = false;
    $scope.hidelunchRecipes = true;
    
    $scope.showLettuceWraps = function(){
        $scope.hideLettuceWraps = false;
        $scope.hideSecNavBar = true;
        $scope.hidelunchRecipes = false;
    };
});