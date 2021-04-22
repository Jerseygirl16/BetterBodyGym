var accountID = localStorage.getItem("accountID");
console.log(accountID);

var usersData = "";
var planData = [];

var app = angular.module("addPlansApp", []);

//loginHome forms
app.controller("addPlansCtrl", function($scope, $http){
    $scope.usersName = "";
    $scope.wPWeek = "";
    $scope.planLength = "";
    $scope.gWeight = "";
    $scope.fGComments = "";
    
    $scope.getName = function(){
        $http({
            method: "get",
            url: "http://localhost:5000/readAccountRecord",
            params: {
                "accId": accountID
            }
        }).then(function(response){
            if(response.data.msg === "SUCCESS"){
                usersData = response.data.accountsData;
                $scope.usersName = usersData.name;
            }
            else{
                console.log(response.data.msg);
            }
        }, function(response){
            console.log(response);
        });
    };
    $scope.getName();
    
     var signUpClasses =[
           {
             classes: "Spin Class"
            },{

             classes: "Water Aerobic"
            },{
             classes: "Yoga"
            },{
             classes: "Zumba"
            },{
             myDateStart: "myDateStart"
            },{
             myDateEnd: "myDateEnd"
            }
        ];
    
    
    var workoutPlan = [
       { 
         week: "wPWeek"
       },{
         length: "fiveTen"
       },{
         length: "tenTwenty"
       },{
         length: "twentyThirty"
       },{
         length: "thirtyForty"
       },{
         length: "fortyFifty"
       },{
         length: "fiftySixty"
       },{
         workoutGoal: "gWeight"
       },{
         comments: "fGComments"
       }
    ];
    
    $scope.cSubmitData = function(){
        
        var startDate = ($scope.myDateStart.getMonth()+1) + '/' + $scope.myDateStart.getDate() + '/' + $scope.myDateStart.getFullYear();
        
        var endDate = ($scope.myDateEnd.getMonth()+1) + '/' + $scope.myDateEnd.getDate() + '/' + $scope.myDateEnd.getFullYear();
        
        
        var classRecord = {
          className: $scope.classes,
          startDate: startDate,
          endDate: endDate
        };
       
        $http({
            method: "put",
            url: "http://localhost:5000/cSubmitRecord",
            params: {
                "accId": accountID,
                "classRecord": classRecord
            }
        }).then(function(response){
            if(response.data.msg === "SUCCESS"){
                $scope.addCSubmit = "Sign-up Complete!";
            }
            else{
                $scope.addCSubmit = response.data.msg;
            }
        }, function(response){
            console.log(response);
        });
    };
    
    //Clear button(sign-up for Classes-loginHome)
    $scope.cReset = function(){
        $scope.spinClass = "";
        $scope.waterAerobics = "";
        $scope.yoga = "";
        $scope.zumba = "";
        $scope.myDataStart = "";
        $scope.myDateEnd = "";
        $scope.clearClasses = "Sign-up Clear";
    }
    
//DoneButton(Plan-LoginHome)
    $scope.pDoneData = function(){
        
        var planRecord = {
          workoutsPerWeek: $scope.wPWeek,
          length: $scope.planLength,
          workoutGoal: $scope.gWeight,
          comments: $scope.fGComments
        };
        
        $http({
            method: "put",
            url: "http://localhost:5000/pDoneRecord",
            params: {
                "accId": accountID,
                "planRecord": planRecord
            }
        }).then(function(response){
            if(response.data.msg === "SUCCESS"){
                $scope.workoutPlan = "";
                $scope.addPDone = "Plan Complete!";
            }
            else{
                $scope.addPDone = response.data.msg;
            }
        }, function(response){
            console.log(response);
        });
    };
    
//ViewPlan
       $scope.getPlan = function(){
      $http({
           method: "get",
            url: "http://localhost:5000/readAccountRecord",
            params: {
                "accId": accountID
            }
        }).then(function(response){
            if(response.data.msg === "SUCCESS"){
                var returnData = response.data.accountsData;
                var planData = JSON.parse(returnData.workoutPlan);
                console.log(planData.workoutPlan);
                $scope.wPWeek = planData.workoutsPerWeek;
                $scope.planLength = planData.length;
                $scope.gWeight = planData.workoutGoal;
                $scope.fGComments = planData.comments;
             }
            else{
                console.log(response.data.msg);
            }
        }, function(response){
            console.log(response);
        });  
    };
    $scope.getPlan();
    
});