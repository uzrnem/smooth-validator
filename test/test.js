const parser = require('smooth-validator');

completed = {
  id: 'numeric|between:-24,30',
  name: 'uppercase:space',
  home_name: 'required|lowercase',
  nice_name: 'uppercase',
  created_at: 'date',
  isEmployee: 'boolean',
  email: 'email',
  regex: 'alphanumeric:underscope,dash',
  compare: 'max:20|min:5|size:10',
  estado: 'same:status|not_in:hide,show1|in:hide,show',
}

var validate = parser(completed)
data1 = {
  id : -23.233,
  name : 'BHAGYESH PATEL',
  home_name : 'yash',
  nice_name : 'YASH',
  email : 'uzrnem@gmail.com',
  compare: 'bhagyeshsp',
  estado : 'show',
  status : 'show',
  address: 'pune',
  isEmployee: 'true',
  created_at : new Date()
}
var res = validate(data1);
console.log(res)

/*
const currentMonth = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
console.log(months[currentMonth.getMonth()]);
new Date().toDateString();
YYYY-MM-DDTHH:MM:SSZ
let completeDate = new Date("2021-01-01");
let yearMonth = new Date("2021-01");
let yearOnly = new Date("2021");
let dateTimeUTC = new Date("2021-01-01T12:00:00Z");
let dateTimeEST = new Date("2021-01-01T12:00:00-04:00");

let longDate1 = new Date("Jan 01 2021");
let longDates = new Date("01 Jan 2021");
let longDate3 = new Date("January 01 2021");
let longDate4 = new Date("JAN 01, 2021");

date, 
after:yesterday,after:2021-01-01,after_or_equals:today
before:tomorrow,before_or_equals:due_date
custom delimeters
*/