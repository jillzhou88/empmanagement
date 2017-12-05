myApp.controller('EmpEditController', ['$scope', '$filter', 'empService', '$location', '$routeParams', 'Upload', function($scope, $filter, empService, $location, $routeParams, Upload){
    console.log('edit controller');
    empService.getEmp($routeParams.id)
        .then(function(response){
        
            empService.getSuperiors($routeParams.id)
                .then(function(superiors){
                
                    $scope.emp = response.data[0];
                    $scope.superiors = superiors.data;
                
                    $scope.photo        = $scope.emp.photo;
                    $scope.fName        = $scope.emp.fName;
                    $scope.lName        = $scope.emp.lName;
                    $scope.gender       = $scope.emp.gender;
                    $scope.title        = $scope.emp.title;
                    $scope.officephone  = $scope.emp.officephone;
                    $scope.cellphone    = $scope.emp.cellphone;
                    $scope.email        = $scope.emp.email;
                    
                    (function(){
                        for(var i = 0; i < $scope.superiors.length; i++){
                            if($scope.emp.superior._id === $scope.superiors[i]._id){
                                $scope.superiorId = $scope.superiors[i]._id;
                            }
                        }                        
                    }());                            
                
                    var startdate = $scope.emp.startdate.split('-');
                    $scope.startyear  = parseInt(startdate[0]);
                    $scope.startmonth = parseInt(startdate[1]);
                    $scope.startday   = parseInt(startdate[2]);
                
                    var numberOfYears = (new Date()).getYear() - 101;
                    var years = $.map($(Array(numberOfYears)), function (val, i) { return i + 2002; });
                    var months = $.map($(Array(12)), function (val, i) { return i + 1; });
                    var days = $.map($(Array(31)), function (val, i) { return i + 1; });

                    var isLeapYear = function () {
                        var year = $scope.startyear || 0;
                        return ((year % 400 === 0 || year % 100 !== 0) && (year % 4 === 0)) ? 1 : 0;
                    }

                    var getNumberOfDaysInMonth = function () {
                        var selectedMonth = $scope.startmonth || 0;
                        return 31 - ((selectedMonth === 2) ? (3 - isLeapYear()) : ((selectedMonth - 1) % 7 % 2));
                    }

                    $scope.UpdateNumberOfDays = function () {
                        $scope.NumberOfDays = getNumberOfDaysInMonth();
                    }

                    $scope.NumberOfDays = 31;
                    $scope.Years = years;
                    $scope.Days = days;
                    $scope.Months = months;

                    $scope.saveEmp = function(){
                        if($scope.startmonth < 10){
                            $scope.startmonth = '0' + $scope.startmonth;
                        }
                        console.log($scope.photo);
                        var updatedEmp = {
                            _id:         $scope.emp._id,
                            photo:       $scope.photo,
                            fName:       $scope.fName,
                            lName:       $scope.lName,
                            gender:      $scope.gender,
                            title:       $scope.title,
                            startdate:   $scope.startyear + '-' + $scope.startmonth + '-' +                  $scope.startday,
                            officephone: $scope.officephone,
                            cellphone:   $scope.cellphone,
                            email:       $scope.email,
                            superior:    $scope.superiorId
                        }
                        console.log(updatedEmp);
                        empService.editEmp(updatedEmp)
                            .then(
                                function(response){
                                    alert(response.data.toString());
                                    $location.path('/');
                                },
                                function(err){
                                    alert('something wrong');
                                }
                            );

                    };
                
                }, function(err){
                    alert('cannot get superiors');
                });
        
            
      }, function(err){
        alert('something wrong');
    });
}]);