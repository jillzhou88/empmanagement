var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');
var bodyParser = require('body-parser');
var multer = require('multer');

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './public/img/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);         
    }
});

var upload = multer({ //multer settings
                storage: storage
            }).single('photo');



module.exports = function(app) {

	// api ---------------------------------------------------------------------    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
	// get employees' list
	app.get('/api/employees', function(req, res) {
        
        Employee.aggregate()
            .lookup({
                from: 'employees',
                localField: '_id',
                foreignField: 'superior',
                as: 'subs'
            })
            .lookup({
                from: 'employees',
                localField: 'superior',
                foreignField: '_id',
                as: 'superior'
            })
            .unwind({
                path: '$superior',
                preserveNullAndEmptyArrays: true
            })
            .project({
                email: 1,
                cellphone: 1,
                officephone: 1,
                startdate: 1,
                gender: 1,
                title: 1,
                lName: 1,
                fName: 1,
                photo: 1,
                subsize: {$size: '$subs'},
                superior: {
                    _id: 1,
                    fName: 1,
                    lName: 1
                }
            })
            .exec(function(err, employees){
                if(err) throw err;
                
                res.json(employees);
        });
        
	});
    
    // test get subordinates list
//    app.get('/api/subordinates/:id', function(req, res){
//        
//        Employee.aggregate({$match: {_id:mongoose.Types.ObjectId(req.params.id)}})
//            .graphLookup({
//                from: 'employees',
//                startWith: '$_id',
//                connectFromField: '_id',
//                connectToField: 'superior',
//                as: 'linkedEmp'
//            })
//            .project('_id, linkedEmp._id')
//            .exec(function(err, result){
//            if(err) throw err;
//            res.json(result);
//        });
//    });
    
    
    // get superior list
    app.get('/api/employees/superior/:id', function(req, res) {
        
        Employee.aggregate({$match: {_id:mongoose.Types.ObjectId(req.params.id)}})
            .graphLookup({
                from: 'employees',
                startWith: '$_id',
                connectFromField: '_id',
                connectToField: 'superior',
                as: 'linkedEmp'
            })
            .project({
                linkedEmp: '$linkedEmp._id'
            })
            .exec(function(err, result){
                if(err) throw err;
                var subs = [];
                result = result[0];
                subs.push(result._id);
                for(var i = 0; i < result.linkedEmp.length; i++){
                    subs.push(result.linkedEmp[i]);
                }
                Employee.find({_id: {$nin: subs}}, '_id fName lName').exec(function(err,employees){
                    if(err){
                        throw err;
                    }
                    else {
                        res.json(employees);
                    }
                });
        });
        
    });
    
    // get direct subordinates
    app.get('/api/employee/:id/subs', function(req, res) {
        
        Employee.find({superior: req.params.id}, 'fName lName _id')
            .exec(function(err, subs){
                if(err) throw err;
                res.json(subs);
            });
        
    });
    
    // create employee 
    app.post('/api/employees', function(req, res) {
        
        upload(req,res,function(err){
              
            if(err){
                 throw err;
            }
        
            var newEmployee = new Employee(req.body);
            
            if(req.file !== undefined){
                newEmployee.photo = '/img/' + req.file.filename;
            }
            
            newEmployee.save(function(err){
                if(err) throw err;
                res.send('successful');
            });
            
        });
	});
    
    // get single employee
    app.get('/api/employees/:id', function(req, res){
        
        Employee.find({ _id:req.params.id })
            .populate({path:'superior',
                       select: ['fName', 'lName', '_id']})
            .exec(function(err, employee){
            if(err){
                throw err;
            }
            else if(!employee){
                res.send('No employee with that id found');    
            } 
            else {
                res.json(employee);
            }
        });
        
    });
    
    // update employee
    app.put('/api/employees/:id', function(req, res) {
       
        upload(req,res,function(err){
              
            if(err){
                 throw err;
            }
            
            var employee = new Employee(req.body);
            employee.isNew = false;
            
            if(req.file !== undefined){
                employee.photo = '/img/' + req.file.filename;
            }
            
            employee.save(function(err){
                if(err) throw err;
                res.send('successful');
            });
            
        });
        
    });

	// delete employee
	app.delete('/api/employees/:id', function(req, res) {
        // get this employee
        Employee.findById(req.params.id)
            .exec(function(err, employee){
               // update all his subordinates' superior into his superior
               // no matter there is one or none
               Employee.updateMany(
                   {superior: req.params.id},
                   {superior: employee.superior},
                   function(err, response){
                       if(err) throw err;
                       // delete this employee and return the rest
                       Employee.findByIdAndRemove(req.params.id, function(err){
                            if(err){
                                throw err;
                            }
                            Employee.aggregate()
                                .lookup({
                                    from: 'employees',
                                    localField: '_id',
                                    foreignField: 'superior',
                                    as: 'subs'
                                })
                                .lookup({
                                    from: 'employees',
                                    localField: 'superior',
                                    foreignField: '_id',
                                    as: 'superior'
                                })
                                .unwind({
                                    path: '$superior',
                                    preserveNullAndEmptyArrays: true
                                })
                                .project({
                                    email: 1,
                                    cellphone: 1,
                                    officephone: 1,
                                    startdate: 1,
                                    gender: 1,
                                    title: 1,
                                    lName: 1,
                                    fName: 1,
                                    photo: 1,
                                    subsize: {$size: '$subs'},
                                    superior: {
                                        _id: 1,
                                        fName: 1,
                                        lName: 1
                                    }
                                })
                                .exec(function(err, employees){
                                    if(err) throw err;

                                    res.json(employees);
                            });
                            
                        });
               });
                   
            });
        
	});

};