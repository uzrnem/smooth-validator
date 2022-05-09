const parser = require('./smooth');

completed = {
  id: 'numeric|between:-24,30',
  name: 'uppercase',
  home_name: 'required|lowercase',
  nice_name: 'uppercase',
  created_at: 'date',
  isEmployee: 'boolean',
  email: 'email',
  regex: 'alpha|alphanumeric|alphaunderscope|alphadash',
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
  