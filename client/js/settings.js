var accountID = localStorage.getItem("accountID");
console.log(accountID);

var accountData = [];

var app = angular.module("addSettingsApp", []);
//Settings Update button
app.controller("addSettingsCtrl", function($scope, $http, $window){
    $scope.hideSettings = false;
    $scope.hideUpdateSettings = true;
    $scope.name = [];
    $scope.address = [];
    $scope.email = [];
    $scope.birthday = [];
    $scope.height = [];
    $scope.weight = [];
    $scope.uName = [];
    $scope.password = [];
    
    
    $scope.getAccount = function(){
        $http({
           method: "get",
            url: "http://localhost:5000/readAccountRecord",
            params: {
                "accId": accountID
            }
        }).then(function(response){
            if(response.data.msg === "SUCCESS"){
                accountData = response.data.accountsData;
                $scope.name = accountData.name;
                $scope.address = accountData.address;
                $scope.email = accountData.email;
                $scope.birthday = accountData.birthday;
                $scope.height = accountData.height;
                $scope.weight = accountData.weight;
                $scope.uName = accountData.uName;
                $scope.password = accountData.password;
             }
            else{
                console.log(response.data.msg);
            }
        }, function(response){
            console.log(response);
        });
    };
    $scope.getAccount();

    $scope.updateButton = function(){
        $scope.hideSettings = true;
        $scope.hideUpdateSettings = false;
    };
    
    $scope.closeSet = function(){
        $scope.hideSettings = false;
        $scope.hideUpdateSettings = true;
    };
    
    $scope.updateSet = function(){
        $http({
            method: "put",
            url: "http://localhost:5000/updateRecord",
            params: {
                "accId": accountID,
                "name": $scope.name,
                "address": $scope.address, 
                "email": $scope.email, 
                "weight": $scope.weight,
                "uName": $scope.uName,
                "password": $scope.password
            }
        }).then(function(response){
            if(response.data.msg === "SUCCESS"){
                $scope.getAccount();
                $scope.updateInfo = "Update Success!";
                
            }
            else{
                $scope.updateInfo = response.data.msg;
            }
        }, function(repsonse){
            console.log(repsonse);
        });
    };
   
    $scope.logOut = function(){
        $window.localStorage.removeItem("accountID");
        $window.location.href="/memberLogin";
    }
    
    $scope.deleteAccount = function(){
            $http({
                method: "delete",
                url: "http://localhost:5000/deleteRecord",
                params: {accId: accountID}
            }).then(function(response){
                if(response.data.msg === "SUCCESS"){
                   $scope.logOut();
                }
                else{
                    console.log(response.data.msg);
                }
            }, function(response){
                console.log(response);
            });
     }
    
   
});
