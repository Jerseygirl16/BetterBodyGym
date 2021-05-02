var accountID = localStorage.getItem("accountID");
console.log(accountID);

var app = angular.module("viewSmoothies", []);

app.controller("viewSmoothies", function($scope, $http){
    $scope.hideChocoPBBanana = true;
    $scope.hideSecNavBar = false;
    $scope.hideSmoothiesRecipes = true;
    
    $scope.showChocoPBBanana = function(){
        $scope.hideChocoPBBanana = false;
        $scope.hideSecNavBar = true;
        $scope.hideSmoothiesRecipes = false;
    };
});