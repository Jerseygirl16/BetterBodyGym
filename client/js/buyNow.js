var app = angular.module("addCheckoutApp", []);

//Continue to checkout button(buynow)
app.controller("addCheckoutCtrl", function($scope, $http, $window){
    
   $scope.dataContinue = function(){
       $http({
           method: "put",
           url: "http://localhost:5000/continueRecord",
           params: {
              // name: $scope.name,
              // email: $scope.email,
              // address: $scope.address,
              // city: $scope.city,
              // state: $scope.state,
              // zip: $scope.zip,
              // cName: $scope.cName,
              // cCNum: $scope.cCNum,
              // expmonth: $scope.expmonth,
              // expyear: $scope.expyear,
              // cvv: $scope.cvv,              
           }
       }).then(function(response){
           if(response.data.msg === "SUCCESS"){
               //$scope.name
               //$scope.email
               //$scope.address
               //$scope.city
               //$scope.state
               //$scope.zip
               //$scope.cName
               //$scope.cCNum
               //$scope.expmonth
               //$scope.expyear
               //$scope.cvv
               //$scope.addCheckout = "Checkout Complete!";
               $window.location.href="/signUp";
           }
           else{
               $scope.addCheckout = response.data.msg;
           }
       }, function(response){
           console.log(response);
       });
   };
});