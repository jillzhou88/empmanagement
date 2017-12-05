// CONFIG
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider,$locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/employees-list.html',
        controller: 'EmpsListController',
        resolve:{
            empsList: emps
        }
    })
    
    .when('/employee/:id', {
        templateUrl: 'pages/employee-detail.html',
        controller: 'EmpDetailController'
    })
    
    .when('/employees/:id', {
        templateUrl: 'pages/employee-edit.html',
        controller: 'EmpEditController'
    })
        
    .when('/new', {
        templateUrl: 'pages/employee-create.html',
        controller: 'EmpCreateController'
    })    
    
}]);

var emps = function(empService){
    return empService.getEmpsList();
}

