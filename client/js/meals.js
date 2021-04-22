var accountID = localStorage.getItem("accountID");
console.log(accountID);

var app = angular.module("addFoodsApp", []);

var arrFoods = [];
var otherFoods = [];

app.controller("addFoodsCtrl", function($scope, $http){
    $scope.nextDR = function(){    
        $scope.hideTypeForm = true;
        $scope.hideFoodForm = false;
        
        
        $http({
            method: "put", 
            url: "http://localhost:5000/nextDRRecord",
            params: {
                "accId": accountID,
                "dietType": $scope.dietType
                
            }
        }).then(function(response){
            if(response.data.msg === "SUCCESS"){
            }
            else{
                $scope.addNextDR = response.data.msg;
            }
            }, function(response){
                console.log(response);
        });
    };
    
    $scope.dRFoods = [
        {name: "Apples"},
        {name: "Bananas"},
        {name: "Carrots"},
        {name: "Dates"},
        {name: "Eggs"},
        {name: "Grapefruit"},
        {name: "Honey"},
        {name: "Jalapeno"},
        {name: "Kiwi"},
        {name: "Lobster"},
        {name: "Milk"},
        {name: "Nutmeg"},
        {name: "Oregano"},
        {name: "Peaches"},
        {name: "Red Peppers"},
        {name: "Sugar"},
        {name: "Quinoa"},
        {name: "Tomatoes"},
        {name: "Vinegar"},
        {name: "Watermelon"},
        {name: "Yeast"},
    ];
    
    //FDone(Dietary Restrictions-Meals)
    $scope.dRDoneData = function(){
        var addDR = [];
        
         $scope.dRFoods.forEach(function(dRFood){

            if(dRFood.name === dRFood.selected){
                addDR.push(dRFood.name);
          }   
        });
            $http({
            method: "put",
            url: "http://localhost:5000/dRDoneRecord",
            params:    {
                "accId": accountID,
                "otherFoods": JSON.stringify(otherFoods),
                "dRFoods": JSON.stringify(addDR)
            }
        }).then(function(response){
            if(response.data.msg === "SUCCESS"){             
      
                $scope.addDRDone = "Foods are Selected!";

            }  
            else{
                $scope.addDRDone = response.data.msg;
            }
            }, function(response){
                console.log(response);
        });
        
        
    };
    
    //UpdateButton(Dietary Restrictions-Meals)
    $scope.updateDR = function(){
         $scope.dRFoods.forEach(function(dRFood){
            if(dRFood.name === dRFood.selected){
             $http({
            method: "put",
            url: "http://localhost:5000/dRUpdateRecord",
            params:    {
                "accId": accountID,
                "addFoods": dRFood.name,
                "type": 1
            }
        }).then(function(response){
            if(response.data.msg === "SUCCESS"){             
      
                $scope.updateDRButton = "Foods are Updated!";

            }  
            else{
                $scope.updateDRButton = response.data.msg;
            }
            }, function(response){
                console.log(response);
        });
                
            console.log("name: " + dRFood.name);
            console.log("value: " + dRFood.selected);
            }   
        });
        
        for(var i=0; i< otherFoods.length; i++){
            $http({
            method: "put",
            url: "http://localhost:5000/dRUpdateRecord",
            params:    {
                "accId": accountID,
                "addFoods": otherFoods[i],
                "type": 2
            }
        }).then(function(response){
            if(response.data.msg === "SUCCESS"){             
      
                $scope.updateDRButton = "Foods are Updated!";

            }  
            else{
                $scope.updateDRButton = response.data.msg;
            }
            }, function(response){
                console.log(response);
        });
        }
        
        
    };
    
    //Other Checkbox clicked
    $scope.searchB = function(){
      $scope.hideSearch = false;
        console.log("addSearch");
    };
    
    
    //Add Foods Button
    $scope.addSData = function(){
        var foodString = "";
        otherFoods.push($scope.addSearch);
        for(var i = 0; i < otherFoods.length; i++){
            foodString += otherFoods[i]+", ";
        }
        
        $scope.addSearchData = foodString;
    };
});