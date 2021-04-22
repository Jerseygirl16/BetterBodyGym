var accountID = localStorage.getItem("accountID");
console.log(accountID);

var memberData = [];

var app = angular.module("viewMealPlanApp", []);

app.controller("viewMealPlanCtrl", function($scope, $http, $window){
     $scope.dietType = [];
     $scope.dRFoods = [];
     $scope.otherFoods = [];
    
    
    $scope.getMealPlan = function(){
        $http({
           method: "get",
            url: "http://localhost:5000/readAccountRecord",
            params: {
                "accId": accountID
            }
        }).then(function(response){
            if(response.data.msg === "SUCCESS"){
                memberData = response.data.accountsData;
                $scope.dietType = memberData.dietType;
                $scope.dRFoods = memberData.dRFoods;
                $scope.otherFoods = memberData.otherFoods;
                console.log($scope.dRFoods);
             }
            else{
                console.log(response.data.msg);
            }
        }, function(response){
            console.log(response);
        });
    };
    $scope.getMealPlan();
    
    $scope.deleteButton = function(){
        $scope.hidePlan = true;
        $scope.hideCheckboxes = false;
    }
    
    $scope.updateDiet = function(){
        $window.location.href="/meals";
    }
    
    $scope.cancel = function(){
        $scope.hidePlan = false;
        $scope.hideCheckboxes = true;
    }
    
        //FDone(Dietary Restrictions-Meals)
    $scope.deleteFoods = function(){
        var deletedDR = [];
        var deletedOther = [];
         $scope.dRFoods.forEach(function(dRFood){
             if($scope.dRFoods.selected[dRFood] === "yes"){
                 deletedDR.push(dRFood);
             }
         });
        
        $scope.otherFoods.forEach(function(otherFood){
            console.log($scope.otherFoods.selected[otherFood]);
             if($scope.otherFoods.selected[otherFood] === "yes"){
                 deletedOther.push(otherFood);
             }
         });
        
        console.log("Foods Deleted!" + deletedDR);
         console.log("Foods Deleted!" + deletedOther);
             $http({
            method: "put",
            url: "http://localhost:5000/deleteFoodsRecord",
            params:    {
                "accId": accountID,
                "deletedDR": JSON.stringify(deletedDR),
                "deletedOther": JSON.stringify(deletedOther)
            }
        }).then(function(response){
            if(response.data.msg === "SUCCESS"){
                $scope.getMealPlan();
                $scope.deletedFoods = "Foods have been Deleted!";

            }  
            else{
                $scope.deletedFoods = response.data.msg;
            }
            }, function(response){
                console.log(response);
        });
    };
});