var app = angular.module("addMembershipsApp", []);

app.controller("addMembershipsCtrl", function($scope, $http, $window){
   $scope.buynow = function(){
       $http({
           method: "post",
           url: "http://localhost:5000/membershipsRecord",
           params: {
               "membershipType": $scope.membershipType
           }
       }).then(function(response){
           console.log(response.data);
           if(response.data.msg === "SUCCESS"){
                 $window.localStorage.setItem("accountID", response.data.accId);
                 $window.location.href="/buynow";
               console.log(response.data.accId);
           }
           else{
               console.log(response);
           }
           }, function(response){
               console.log(response);
       });
   }; 
});