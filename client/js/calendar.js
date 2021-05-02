var app = angular.module("addCalendarApp", ['daypilot']);

app.controller("addCalendarCtrl", function($scope, $timeout, $http){
   $scope.events = [
    {
       start: new DayPilot.Date("2014-09-05T00:00:00"),
       end: new DayPilot.Date("2014-09-06T00:00:00"),
       id: DayPilot.guid(),
       resources: "B",
       text: "One-Day Event"
    }
   ];
    
    $scope.config = {
        scale: "Day",
        days: 14,
        startDate: "2021-09-01",
        onEventMoved: function(args){
            $scope.dp.message("Event moved: " + args.e.text());
        },
           eventClickHandling: "Select",
           onEventSelected: function(arg){
            $scope.selectedEvents = $scope.dp.multiselect.events();
               $scope.$apply();
        },
        timeHeaders: [
            {groupBy: "Month"},
            {groupBy: "Cell", format: "d"}
        ],
        resources: [
            {name: "Room B", id: "B"},
            {name: "Room C", id: "C"},
            {name: "Room D", id: "D"},
            {name: "Room E", id: "E"},
        ]
        
     
    };
    
    $scope.message = function(){
        $scope.dp.message("Hi");
    };
    
    $scope.add = function(){
        $scope.events.push(
            {
                start: new DayPilot.Date("2014-09-05T00:00:00"),
                end: new DayPilot.Date("2014-09-06T00:00:00"),
                id: DayPilot.guid(),
                resource: "B",
                text: "One-Day Event" 
            }
        );
    };
    
    $scope.move = function(){
        var event = $scope.events[0];
        event.start = event.start.addDays(1);
        event.end = event.end.addDays(1);
    };
    
    $scope.rename = function() {
        $scope.events[0].text = "New name";
    };
    
    $scope.scale = function(val){
        $scope.config.scale = val;
    };
    
});