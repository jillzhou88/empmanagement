myApp.factory('empService',['$http', 'Upload', function($http, Upload){
    var addNewEmp = function(newObj){
        return Upload.upload({
            url: '/api/employees/',
            method: 'POST',
            data: newObj
        });
    };
    
    var getEmpsList = function(){
        return $http.get('/api/employees');
    };
    
    var getEmp = function(id){
        return $http.get('/api/employees/'+id);
    }
    
    var editEmp = function(obj){
        return Upload.upload({
            url: '/api/employees/'+obj._id,
            method: 'PUT',
            data: obj
        });
    };
    
    var deleteEmp = function(id){
        return $http.delete('/api/employees/'+id);
    };
    
    var getSubordinates = function(id){
        return $http.get('/api/employee/'+id+'/subs');
    }
    
    var getSuperiors = function(id){
        return $http.get('/api/employees/superior/'+id);
    }
    
    return {
        addNewEmp: addNewEmp,
        getEmpsList: getEmpsList,
        getEmp: getEmp,
        editEmp: editEmp,
        deleteEmp: deleteEmp,
        getSubordinates: getSubordinates,
        getSuperiors: getSuperiors
    };
}]);