# Smooth-Validator for Javascript

[![smooth-validator](https://img.shields.io/badge/validator-plain_javascript-green)](https://github.com/uzrnem/smooth-validator)
[![npm version](https://img.shields.io/npm/v/smooth-validator.svg)](https://www.npmjs.com/package/smooth-validator)
[![Bundle Zip Size](https://img.shields.io/bundlephobia/minzip/smooth-validator)](https://www.npmjs.com/package/smooth-validator)
[![Bundle Size](https://img.shields.io/bundlephobia/min/smooth-validator)](https://www.npmjs.com/package/smooth-validator)


## Getting Started

### Installation

```sh
npm install smooth-validator
```

### Usage
[Smooth-Validator] provides you various types of validation for object.


#### Code Example for Sign Up validation

Pass rules to be applied on data to the parser and parser will return validator which will validate data for you.

```
const parser = require("smooth-validator");

//Sample signup validation
var rules = {
  email : 'required|email|min:5|max:100',
  password: 'required|min:6|max:30',
  confirm_password: 'required|same:password'
}
var validator = parser(rules) //parser returns validator, which can be used on data object

var data = {
  email: 'gisueinc@gmail.com',
  password: 'strong',
  confirm_password: 'strong'
}
console.log(validator(data))
//OUTPUT: { message: 'validation passed', errors: [] }
```


#### Code Example for Custom Message

[Smooth-Validator] also supports custom message in error.

```
const parser = require("smooth-validator");

rules = {
  '*emailTo': ["email"],
  created_at: 'after:tomorrow'
}

var validate = parser(rules, {
  message: {
    'emailTo[].email': ':variable failed :type for :value at index :zero',
    'created_at.after' : ':variable is not after :first_value'
  }
})

data = {
  emailTo: ["gmail.com"],
  created_at: new Date()
}
var res = validate(data);
console.log(res.message)
/* Output: 
{
  message: 'emailTo failed email for gmail.com at index 0',
  errors: [
    {
      key: 'emailTo[]',
      message: 'emailTo failed email for gmail.com at index 0'
    },
    { key: 'created_at', message: 'created_at is not after tomorrow' }
  ]
} */
```

## Documentation 📚
Please go through [documentation] from more details and examples

## Contribution
We would love to get help from you on [Github].


Core Team

* [Bhagyesh Sunil Patel]

[//]: # (These are reference links used in the body of this note)

   [Bhagyesh Sunil Patel]: <https://www.linkedin.com/in/uzrnem>
   [Github]: <https://github.com/uzrnem/smooth-validator>
   [documentation]: <https://uzrnem.github.io/smooth-validator>
   [Smooth-Validator]: <https://www.npmjs.com/package/smooth-validator>
