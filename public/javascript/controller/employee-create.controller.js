myApp.controller('EmpCreateController', ['$scope', '$window', 'empService', '$location', function($scope, $window, empService, $location){
    console.log('create controller');
    
    $scope.superiors = JSON.parse($window.localStorage.getItem('emps'));
    
    $scope.photo        = '/img/default-user-image.png';
    $scope.fName        = '';
    $scope.lName        = '';
    $scope.gender       = '';
    $scope.title        = '';
    $scope.officephone  = '';
    $scope.cellphone    = '';
    $scope.email        = '';


    $scope.startyear    = (new Date()).getFullYear();
    $scope.startmonth   = (new Date()).getMonth() + 1;
    $scope.startday     = (new Date()).getDate();
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
        var newEmp = {
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
        
        if($scope.photo !== '/img/default-user-image.png'){
            newEmp.photo = $scope.photo;
        }
        
        empService.addNewEmp(newEmp)
            .then(
                function(response){
                    alert(response.data);
                    $location.path('/');
                },
                function(err){
                    alert('something wrong');
                }
            );
    };

//    $scope.error = false;
//    $scope.incomplete = false;
//
//    $scope.$watch('title', function () {
//        $scope.test();
//    });
//    $scope.$watch('fName', function () {
//        $scope.test();
//    });
//    $scope.$watch('lName', function () {
//        $scope.test();
//    });
//    $scope.$watch('gender', function () {
//        $scope.test();
//    });
//    $scope.$watch('startyear', function () {
//        $scope.test();
//    });
//    $scope.$watch('startmonth', function () {
//        $scope.test();
//    });
//    $scope.$watch('startday', function () {
//        $scope.test();
//    });
//    $scope.$watch('officephone', function () {
//        $scope.test();
//    });
//
//
//    $scope.test = function () {
//        $scope.incomplete = false;
//        if (!$scope.fName.length || !$scope.lName.length || !$scope.title.length || !$scope.gender.length || $scope.startyear === undefined || $scope.startmonth === undefined || $scope.startday === undefined || !$scope.officephone.length) {
//            $scope.incomplete = true;
//        }
//    }; 
        
}]);