var {validator} = require('./index');
validators = {
  'id' : 'numeric',
  'name' : 'alpha|alphanumeric|max:20',
  'nice_name' : 'nullable|uppercase|lowercase',
  'home_name' : 'nullable|uppercase|lowercase',
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

console.log(validator(data, validators))
