var Employee = require('../models/employee');

module.exports = function(app){
    
    app.get('/api/setupEmp', function(req, res){
       
        //seed database
        var starterEmp = [
  {
    "_id": "59ea9c841eeedee8fbd11346",
    "photo": "/img/default-user-image.png",
    "fName": "Glory",
    "lName": "Mayer",
    "title": "supervisor",
    "gender": "female",
    "startdate": "2007-11-21",
    "officephone": "(934) 531-3443",
    "cellphone": "(973) 426-2652",
    "email": "glorymayer@scenty.com",
    "superior": "59ea9c84188bfa2017ace974"
  },
  {
    "_id": "59ea9c84188bfa2017ace974",
    "photo": "/img/default-user-image.png",
    "fName": "Acevedo",
    "lName": "Banks",
    "title": "manager",
    "gender": "male",
    "startdate": "2002-03-27",
    "officephone": "(940) 531-2508",
    "cellphone": "(887) 547-3624",
    "email": "acevedobanks@scenty.com",
    "superior": "59ea9c843cc095178840e9d8"
  },
  {
    "_id": "59ea9c84774eb734f553817e",
    "photo": "/img/default-user-image.png",
    "fName": "Whitley",
    "lName": "Kent",
    "title": "manager",
    "gender": "male",
    "startdate": "2006-06-12",
    "officephone": "(963) 570-3866",
    "cellphone": "(858) 452-2800",
    "email": "whitleykent@scenty.com",
    "superior": "59ea9c843cc095178840e9d8"
  },
  {
    "_id": "59ea9c848e294108ae768f80",
    "photo": "/img/default-user-image.png",
    "fName": "Ballard",
    "lName": "Joyner",
    "title": "manager",
    "gender": "male",
    "startdate": "2009-04-06",
    "officephone": "(876) 521-2382",
    "cellphone": "(851) 551-2644",
    "email": "ballardjoyner@scenty.com",
    "superior": "59ea9c843cc095178840e9d8"
  },
  {
    "_id": "59ea9c848f7f27fb6e3a35f2",
    "photo": "/img/default-user-image.png",
    "fName": "Charlotte",
    "lName": "Moses",
    "title": "supervisor",
    "gender": "female",
    "startdate": "2008-07-24",
    "officephone": "(944) 571-3175",
    "cellphone": "(943) 579-2520",
    "email": "charlottemoses@scenty.com",
    "superior": "59ea9c848e294108ae768f80"
  },
  {
    "_id": "59ea9c843cc095178840e9d8",
    "photo": "/img/default-user-image.png",
    "fName": "Gillespie",
    "lName": "Rush",
    "title": "director",
    "gender": "male",
    "startdate": "2017-08-14",
    "officephone": "(881) 471-2826",
    "cellphone": "(845) 496-3021",
    "email": "gillespierush@scenty.com",
    "superior": null
  },
  {
    "_id": "59ea9c8425412d3fc2ff0881",
    "photo": "/img/default-user-image.png",
    "fName": "Garza",
    "lName": "Melton",
    "title": "director",
    "gender": "male",
    "startdate": "2014-02-23",
    "officephone": "(879) 416-2287",
    "cellphone": "(980) 521-2154",
    "email": "garzamelton@scenty.com",
    "superior": null
  },
  {
    "_id": "59ea9c8463d6791f5c06bd58",
    "photo": "/img/default-user-image.png",
    "fName": "Hallie",
    "lName": "Elliott",
    "title": "developer",
    "gender": "female",
    "startdate": "2015-03-10",
    "officephone": "(921) 556-3874",
    "cellphone": "(989) 413-2105",
    "email": "hallieelliott@scenty.com",
    "superior": "59ea9c84049c7f522900f599"
  },
  {
    "_id": "59ea9c84049c7f522900f599",
    "photo": "/img/default-user-image.png",
    "fName": "Kathryn",
    "lName": "Larsen",
    "title": "supervisor",
    "gender": "female",
    "startdate": "2016-08-18",
    "officephone": "(952) 573-3362",
    "cellphone": "(909) 494-2884",
    "email": "kathrynlarsen@scenty.com",
    "superior": "59ea9c84b293111907c6e815"
  },
  {
    "_id": "59ea9c84a840aa933ba61ea0",
    "photo": "/img/default-user-image.png",
    "fName": "Miriam",
    "lName": "Ortega",
    "title": "developer",
    "gender": "female",
    "startdate": "2007-12-08",
    "officephone": "(916) 582-2754",
    "cellphone": "(885) 489-2590",
    "email": "miriamortega@scenty.com",
    "superior": "59ea9c84049c7f522900f599"
  },
  {
    "_id": "59ea9c8472d3184961a16f5b",
    "photo": "/img/default-user-image.png",
    "fName": "Berry",
    "lName": "Dorsey",
    "title": "developer",
    "gender": "male",
    "startdate": "2002-07-30",
    "officephone": "(810) 563-2524",
    "cellphone": "(853) 598-3385",
    "email": "berrydorsey@scenty.com",
    "superior": "59ea9c8464e86906f173e43e"
  },
  {
    "_id": "59ea9c8464e86906f173e43e",
    "photo": "/img/default-user-image.png",
    "fName": "Latoya",
    "lName": "Lara",
    "title": "supervisor",
    "gender": "female",
    "startdate": "2015-06-20",
    "officephone": "(813) 431-2110",
    "cellphone": "(846) 561-2743",
    "email": "latoyalara@scenty.com",
    "superior": "59ea9c84b293111907c6e815"
  },
  {
    "_id": "59ea9c84b293111907c6e815",
    "photo": "/img/default-user-image.png",
    "fName": "Gayle",
    "lName": "Deleon",
    "title": "manager",
    "gender": "female",
    "startdate": "2004-10-27",
    "officephone": "(920) 538-2825",
    "cellphone": "(857) 546-3172",
    "email": "gayledeleon@scenty.com",
    "superior": "59ea9c843cc095178840e9d8"
  },
  {
    "_id": "59ea9c8456ba4013a8eac0e3",
    "photo": "/img/default-user-image.png",
    "fName": "Benson",
    "lName": "Harmon",
    "title": "supervisor",
    "gender": "male",
    "startdate": "2009-01-07",
    "officephone": "(916) 442-3418",
    "cellphone": "(876) 516-3479",
    "email": "bensonharmon@scenty.com",
    "superior": "59ea9c84b293111907c6e815"
  },
  {
    "_id": "59ea9c8468eecd9751c04cbf",
    "photo": "/img/default-user-image.png",
    "fName": "Latasha",
    "lName": "Buchanan",
    "title": "developer",
    "gender": "female",
    "startdate": "2010-12-24",
    "officephone": "(949) 591-3773",
    "cellphone": "(966) 416-3536",
    "email": "latashabuchanan@scenty.com",
    "superior": "59ea9c8456ba4013a8eac0e3"
  },
  {
    "_id": "59ea9c84209e9572d31449e5",
    "photo": "/img/default-user-image.png",
    "fName": "Powers",
    "lName": "Bright",
    "title": "developer",
    "gender": "male",
    "startdate": "2017-08-29",
    "officephone": "(905) 462-3167",
    "cellphone": "(988) 513-2089",
    "email": "powersbright@scenty.com",
    "superior": "59ea9c8456ba4013a8eac0e3"
  },
  {
    "_id": "59ea9c84df82b62795bbdfda",
    "photo": "/img/default-user-image.png",
    "fName": "Hernandez",
    "lName": "Morse",
    "title": "supervisor",
    "gender": "male",
    "startdate": "2006-10-28",
    "officephone": "(834) 476-3493",
    "cellphone": "(860) 400-2178",
    "email": "hernandezmorse@scenty.com",
    "superior": "59ea9c8425412d3fc2ff0881"
  }
];
        Employee.create(starterEmp, function(err, results){
            if(err) console.log(err);
            res.send(results);
        });
        
    });
    
}