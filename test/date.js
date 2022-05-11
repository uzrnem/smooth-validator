const parser = require('smooth-validator');

completed = {
  created_at: 'before:tomorrow',
  updated_at: 'before_or_equals:created_at',
  sold_at: 'after_or_equals:2022-05-15',
}

var validate = parser(completed)
data1 = {
  created_at : new Date(),
  updated_at: new Date(),
  sold_at: '2022-05-14'
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