const parser = require('smooth-validator');

completed = {
  created_at: 'after:tomorrow',
  updated_at: 'before_or_equals:created_at',
  sold_at: 'after_or_equals:2022-05-15',
}

var validate = parser(completed, {
  date_format: 'YY-MM-DD',
  transalation: {
    'created_at.after' : ':variable validation failed',
    'sold_at.after_or_equals' : ':value comes before :first_value',
  }
})
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


rules = {
  id: 'numeric|between:-24,30',
  name: 'uppercase:space',
  home_name: 'required|lowercase|alpha',
  nice_name: 'alphanumeric',
  created_at: 'date',
  isEmployee: 'boolean',
  email: 'email',
  alpha: 'alpha:underscope,dash',
  compare: 'max:20|min:5|size:10',
  estado: 'same:status|not_in:hide,show1|in:hide,show',
}

var validate = parser(rules)
data = {
  id : -23.233,
  name : 'BHAGYESH PATEL',
  home_name : 'yash',
  nice_name : 'YASH89',
  email : 'uzrnem@gmail.com',
  compare: 'bhagyeshsp',
  alpha: 'rege_x-x',
  estado : 'show',
  status : 'show',
  address: 'pune',
  isEmployee: 'true',
  created_at : new Date()
}
var res = validate(data);
console.log(res)

//const parser = require('smooth-validator');

rules = {
  '*emailTo': ["email"],
  '*address': {
    'city': "required",
    '*near': ["max:12|uppercase"],
    '*parent': {
      'name': "required|uppercase",
      '*names': ["min:4"]
    }
  },
  '*books': [
    {
      'name': "required",
      'author': {
        'name': "required"
      },
      'emails': ["required|email"]
    }
  ]
}

var validate = parser(rules, {
  message: {
    'emailTo[].email': ':variable failed :type at index :zero'
  }
})

data = {
  emailTo: ["bsp@gmail.com"],
  address: {
    city: "pune",
    near: ["BSECTOR", "DSECTOR"],
    parent: {
      name: "Maharastra",
      names: ["pune", "puna"]
    }
  },
  books: [
    {
      id: 10,
      name: "Type of Validator",
      author: { name: "bhagyesh patel" },
      emails: ["bsp@gmail.com", ""]
    }
  ]
}
var res = validate(data);
console.log(res)

