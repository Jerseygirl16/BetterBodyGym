var accountID = localStorage.getItem("accountID");
console.log(accountID);
var app = angular.module("addSignUpApp", []);
//signUpButton(signUp)
app.controller("addSignUpCtrl", function($scope, $http, $window, $filter){
   $scope.signUpBData = function(){
       var birthdate = ($scope.birthday.getMonth()+1) + '/' + $scope.birthday.getDate() + '/' + $scope.birthday.getFullYear();
       
       $http({
           method: "put",
           url: "http://localhost:5000/signUpRecord",
           data: {
                "accId": accountID,
                "name": $scope.name,
                "address": $scope.address,
                "email": $scope.email,
                "birthday": birthdate,
                "height": $scope.height,
                "weight": $scope.weight,
                "uName": $scope.uName,
                "password": $scope.password
           }
       }).then(function(response){
           if(response.data.msg === "SUCCESS"){
               $scope.addSignUp = "Sign-up Complete!"
               $window.location.href="/memberLogin";
           }
           else{
               $scope.addSignUp = response.data.msg;
           }
           }, function(response){
                console.log(response);
       });
   };
    
  //Clear Button
  $scope.clearF = function(){
      $scope.name = "";
      $scope.address = "";
      $scope.email = "";
      $scope.birthday = "";
      $scope.height = "";
      $scope.weight = "";
      $scope.uName = "";
      $scope.password = "";
      $scope.clearSignUp = "All Clear";
  }  
});
