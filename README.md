# Use Various Validator in Javascript

Code can be found in node_moduels/smooth-validator

import packages (es6)

```sh
import { dataType } from 'smooth-validator';
import { verify } from 'smooth-validator';
```

Validator to check data Type

```sh
var str = '';

if (dataType.isEmpty(str)) {
  console.log('str is Empty');
} else {
  console.log('str is not Empty');
}
console.log('dataType.isString("string") : ' + dataType.isString("string")); //true
console.log("dataType.isNumber([]) : " + dataType.isNumber([])); //false
console.log("dataType.isArray([]) : " + dataType.isArray([])); //true
console.log("dataType.isObject(null) : " + dataType.isObject(null)); // null
console.log("dataType.isNull(212) : " + dataType.isNull(212)); // false
console.log("dataType.isUndefined(90) : " + dataType.isUndefined(90)); // false
console.log("dataType.isEmpty(0) : " + dataType.isEmpty(0)); // true
console.log("dataType.isBoolean(false) : " + dataType.isBoolean(false)); // true
console.log("dataType.isEmail('uzrnem@gmail.com') : " + dataType.isEmail('uzrnem@gmail.com')); // true
```

Validate the data

```sh
rules = {
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

console.log(verify(data, rules))

{ success: false,
  message: 'id is not number',
  errors:
   [ { key: 'id', message: 'id is not number' },
     { key: 'name', message: 'name is not alphabetic' },
     { key: 'name', message: 'name is not alphanumeric' },
     { key: 'name', message: "name's length is greater than 20" },
     { key: 'nice_name', message: 'nice_name is not uppercase' },
     { key: 'nice_name', message: 'nice_name is not lowercase' },
     { key: 'email', message: "email\'s length is less than 5" },
     { key: 'email', message: 'email is not valid' },
     { key: 'estado', message: "estado\'s is invalid" },
     { key: 'address', message: 'address is required' },
     { key: 'created_at', message: 'created_at is not date' } ] }
```
here `data` is Actual Data and `rules` is validation rules on data.
if u want errors in key pair value, pass third parameter `Type` as true (*some errors may overwrite)

```sh
console.log(verify(data, rules, true))

{ success: false,
  message: 'id is not number',
  errors:
   [ id: 'id is not number',
     name: "name\'s length is greater than 20",
     nice_name: 'nice_name is not lowercase',
     email: 'email is not valid',
     estado: "estado\'s is invalid",
     address: 'address is required',
     created_at: 'created_at is not date' ] }
```

If all is right, output will be

```sh
{ success: true }
```

Core Team

* [Bhagyesh Sunil Patel]

[//]: # (These are reference links used in the body of this note)

   [Bhagyesh Sunil Patel]: <https://github.com/uzrnem>
