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



[
    ‘password’ => ‘required|min:8|max:255’
], [
    ‘password.required’ => ‘The password field is required.’,
    ‘password.min’ => ‘The password must have at list 8 characters.’,
    ‘password.max’ => ‘The password cannot exceed 255 characters.’,
]
$messages = [
    'same' => 'The :attribute and :other must match.',
    'size' => 'The :attribute must be exactly :size.',
    'between' => 'The :attribute value :input is not between :min - :max.',
    'in' => 'The :attribute must be one of the following types: :values',
];[
    'credit_card_number' => 'required_if:payment_type,cc'
]

*/