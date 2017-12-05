'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EmpSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  photo: {
    type: String,
    default: '/img/default-user-image.png'
  },
  fName: {
    type: String,
    default: '',
    trim: true,
    required: 'Firstname cannot be blank'
  },
  lName: {
    type: String,
    default: '',
    trim: true,
    required: 'Lastname cannot be blank'
  },
  title: {
    type: String,
    default: '',
    required: 'Title cannot be blank'
  },
  gender: {
    type: String,
    default: '',
    trim: true,
    required: 'Gender cannot be blank'
  },
  startdate: {
    type: String,
    default: '',
    required: 'Start Date cannot be blank'
  },
  officephone: {
    type: String,
    default: '',
    required: 'Office phone number cannot be blank'
  },
  cellphone: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: '',
    required: 'Email address cannot be blank'
  },
  superior: {
    type: Schema.ObjectId,
    ref: 'Employee',
    default: undefined
  }   
});

var Employee = mongoose.model('Employee', EmpSchema);

module.exports = Employee;
























