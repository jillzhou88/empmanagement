myApp.controller('EmpsListController', ['$scope','$rootScope','$window', '$filter','empsList','empService', function($scope, $rootScope, $window, $filter, empsList, empService){
    
    $rootScope.$on('$stateChangeError', 
        function(event, toState, toParams, fromState, fromParams, error){ 
                // this is required if you want to prevent the $UrlRouter reverting the URL to the previous valid location
                event.preventDefault();
                alert('something wrong');
        }
    );
    
    
    $scope.emps = empsList.data;
    $window.localStorage.setItem('emps', JSON.stringify($scope.emps));
    
    $scope.showEmp = function(emp){
        $window.location = '#/employee/' + emp._id;
    }
    
    $scope.deleteEmp = function (id) {
        empService.deleteEmp(id).then(function(response){
            alert('Delete Successfully');
            $scope.emps = response.data;
            $scope.buildPager();
        }, function(err){
            alert('something wrong');
        });         
    };
    
    // infinite scroll      
    $scope.buildPager = function () {
      $scope.empLimit = 10;
      $scope.figureOutItemsToDisplay();
    }
    
    $scope.figureOutItemsToDisplay = function () {
      $scope.filteredItems = $filter('filter')($scope.emps, {
        $: $scope.search
      });
    }
    
    $scope.getSup = function(supId){
        $scope.filteredItems = $filter('filter')($scope.emps, {
          _id: supId
        });
        $scope.search = 'name: ' + $scope.filteredItems[0].fName + ' ' + $scope.filteredItems[0].lName;
    }
    
    $scope.getSub = function(id, fName, lName){
        $scope.filteredItems = $filter('filter')($scope.emps, {
          superior: { _id: id }
        });
        $scope.search = 'reportTo: ' + fName + ' ' + lName;
    }
      
    $scope.buildPager();  
    
    $scope.increaseEmp = function () {
        $scope.empLimit += 10;
    }
    // ----- end scroll
    
    // sort
    $scope.propertyName = $scope.emps.$index;
    $scope.reverse = true;
    $scope.sortBy = function (propertyName, sortUsed) {
        if(propertyName === undefined){
            $scope.reverse = true;
        }
        else{          
            if(sortUsed === true){
                $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            }
        }
        
        $scope.propertyName = propertyName;
        
    }
    // ----- end sort
    
}]);