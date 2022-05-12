const parser = require('smooth-validator');
const assert = require('chai').assert;

describe('general', function () {
  describe('required', function () {
    it('pass', function () {
      var validate = parser({ id: 'required' })
      var res = validate({ id : -24.6778 });
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ id: 'required' })
      var res = validate({});
      assert.equal( res.message, "id is required")
    })
    it('extra arguments', function () {
      try {
        parser({ id: 'required:-220' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'required', no extra params required")
      }
    })
  })

  describe('required_if', function () {
    it('pass', function () {
      var validate = parser({ due_date: 'required_if:status,active' })
      var res = validate({ due_date: null });
      assert.equal( res.message, "validation passed")
      var res = validate({ due_date: null, status: 'inactive' });
      assert.equal( res.message, "validation passed")
      var res = validate({ due_date: new Date(), status: 'active' })
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ due_date: 'required_if:status,active' })
      var res = validate({ due_date: null, status: 'active' })
      assert.equal( res.message, "due_date is required")
    })
    it('insuffient arguments', function () {
      try {
        parser({ id: 'required_if:10' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'required_if', two params are required")
      }
    })
    it('extra arguments', function () {
      try {
        parser({ id: 'required_if:-20,0,20' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'required_if', only two params are allowed")
      }
    })
  })

  describe('same', function () {
    it('pass', function () {
      var validate = parser({ id: 'same:marks' })
      var res = validate({ id : 20, marks: 20 });
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ id: 'same:marks' })
      var res = validate({ id : 20, marks: 23 });
      assert.equal( res.message, "id is not equal to marks")
      var res = validate({ id : 25 });
      assert.equal( res.message, "id can not match, marks is missing from input")
    })
    it('insuffient arguments', function () {
      try {
        parser({ id: 'same' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'same', value param is required")
      }
    })
    it('extra arguments', function () {
      try {
        parser({ id: 'same:-20,0,20' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'same', only one value param is allowed")
      }
    })
  })
})
/*
general: required, same
integer: numeric, between, gt, gte, lt, lte
boolean
date
string: min, max, size, in, not_in, email, alpha, alphanumeric,
 uppercase, lowercase, starts_with, ends_with


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
   */