myApp.controller('EmpDetailController', ['$scope', 'empService', '$location', '$routeParams', function($scope, empService, $location, $routeParams){
    
    empService.getEmp($routeParams.id)
        .then(function(response){
        
            // get direct subordinates
            empService.getSubordinates($routeParams.id)
                .then(function(subs){
                    $scope.emp = response.data[0];
                    $scope.subs = subs.data;                
                });
        
        });
    
}]);
















