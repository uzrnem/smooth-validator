var {verify} = require('smooth-validator');
validators = {
  'id' : 'numeric',
  'name' : 'alpha|alphanumeric|max:20',
  'nice_name' : 'nullable|uppercase',
  'home_name' : 'nullable|lowercase',
  'email' : 'min:5|email',
  'estado' : 'in:show,hide',
  'address' : 'required',
  'created_at' : 'required|date'
}
data = {
  id : '23l',
  name : 'Er. Bhagyesh Sunil Patel',
  home_name : '',
  nice_name : 'Yash',
  email : '',
  estado : 'show',
  created_at : '2018-09-10'
}

data1 = {
  id : 23,
  name : 'Bhagyesh Sunil Patel',
  home_name : 'yash',
  nice_name : 'YASH',
  email : 'uzrnem@gmail.com',
  estado : 'show',
  status : 'show',
  address: 'pune',
  created_at : new Date()
}

console.log(verify(data, validators))
console.log(verify(data1, validators))
