Employee management system

This is a small project I made using MEAN stack (mongodb, expressjs, angularjs, nodejs)

No Authentication.

Homepage: list of employees (name, picture, title, number of direct reports, superior...), search, sort, infinite scrolling, add new employee

Detail page: detail information, names of direct reports

Edit/addnew page: edit information. list of superior to select

There is a manager-report_to relationship (relationship cannot be circle among employees), I implemented it by using mongodb aggregation(in routes.js).

Photo uploading using multer module, copy user's selected photo to another disk storage and save the path to database
