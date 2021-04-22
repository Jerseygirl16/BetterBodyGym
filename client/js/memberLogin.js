//var accountID = localStorage.getItem("accountID");
var app = angular.module("addLoginApp", []);

//submitButton(login)
app.controller("addLoginCtrl", function($scope, $http, $window){
    
    $scope.uName = "";
    $scope.password = "";
    
    $scope.dataLogin = function(){
        $http({
            method: "get",
            url:"http://localhost:5000/readAccountRecord", 
            params: {
                "uName": $scope.uName,
                "password": $scope.password
            }
        }).then(function(response){
                if(response.data.msg === "SUCCESS"){
                    console.log(response.data);
                    $window.localStorage.setItem("accountID", response.data.userData.accId);
                    $scope.addResults = "Login Complete!";
                    $window.location.href="/loginHome";
                }
                else{
                    $scope.addResults = response.data.msg;
                }
        }, function(response){
                    console.log(response);
                 });
    };
});