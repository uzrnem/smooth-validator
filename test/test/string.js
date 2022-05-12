const parser = require('smooth-validator');
const assert = require('chai').assert;

describe('string', function () {
  describe('min', function () {
    it('pass', function () {
      var validate = parser({ password: 'min:6' })
      var res = validate({ password : 'passing' });
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ password: 'min:8' })
      var res = validate({password : 'passing'});
      assert.equal( res.message, "password's length is less than 8")
    })
    it('insuffient arguments', function () {
      try {
        parser({ id: 'min' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'min', value param is required")
      }
    })
    it('extra arguments', function () {
      try {
        parser({ id: 'min:220,20' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'min', only one value param is allowed")
      }
    })
  })

  describe('max', function () {
    it('pass', function () {
      var validate = parser({ password: 'max:8' })
      var res = validate({ password : 'passing' });
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ password: 'max:6' })
      var res = validate({password : 'passing'});
      assert.equal( res.message, "password's length is greater than 6")
    })
    it('insuffient arguments', function () {
      try {
        parser({ id: 'max' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'max', value param is required")
      }
    })
    it('extra arguments', function () {
      try {
        parser({ id: 'max:220,20' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'max', only one value param is allowed")
      }
    })
  })

  describe('size', function () {
    it('pass', function () {
      var validate = parser({ password: 'size:7' })
      var res = validate({ password : 'passing' });
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ password: 'size:6' })
      var res = validate({password : 'passing'});
      assert.equal( res.message, "password's length not equal to 6")
      var res = validate({password : 'pass'});
      assert.equal( res.message, "password's length not equal to 6")
    })
    it('insuffient arguments', function () {
      try {
        parser({ id: 'size' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'size', value param is required")
      }
    })
    it('extra arguments', function () {
      try {
        parser({ id: 'size:220,20' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'size', only one value param is allowed")
      }
    })
  })

  describe('in', function () {
    it('pass', function () {
      var validate = parser({ password: 'in:passing,failing' })
      var res = validate({ password : 'passing' });
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ password: 'in:passing,failing' })
      var res = validate({password : 'pass'});
      assert.equal( res.message, "password's value is not in array")
    })
    it('insuffient arguments', function () {
      try {
        parser({ id: 'in' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'in', value param is required")
      }
    })
  })

  describe('not_in', function () {
    it('pass', function () {
      var validate = parser({ status: 'not_in:inactive,delete' })
      var res = validate({ status : 'active' });
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ status: 'not_in:inactive,delete' })
      var res = validate({ status : 'inactive' });
      assert.equal( res.message, "status's value is in invalid array")
    })
    it('insuffient arguments', function () {
      try {
        parser({ id: 'not_in' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'not_in', value param is required")
      }
    })
  })

  describe('email', function () {
    it('pass', function () {
      var validate = parser({ email: 'email' })
      var res = validate({ email : 'gisueinc@gmail.com' });
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ email: 'email' })
      var res = validate({ email : 'dmsk' });
      assert.equal( res.message, "email is invalid")
    })
    it('extra arguments', function () {
      try {
        parser({ id: 'email:-220' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'email', no extra params required")
      }
    })
  })

  describe('alpha', function () {
    it('pass', function () {
      var validate = parser({ name: 'alpha' })
      var res = validate({ name : 'bhagyesh' });
      assert.equal( res.message, "validation passed")

      var validate = parser({ name: 'alpha:dash,space,underscope' })
      var res = validate({ name : 'bhagy _e-sh' });
      assert.equal( res.message, "validation passed")

      var validate = parser({ name: 'alpha:underscope' })
      var res = validate({ name : 'bhagy_esh' });
      assert.equal( res.message, "validation passed")

      var validate = parser({ name: 'alpha:dash' })
      var res = validate({ name : 'bhagye-sh' });
      assert.equal( res.message, "validation passed")

      var validate = parser({ name: 'alpha:space,dash' })
      var res = validate({ name : 'bhagy e-sh' });
      assert.equal( res.message, "validation passed")

      var validate = parser({ name: 'alpha:space' })
      var res = validate({ name : 'bhagy esh' });
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ name: 'alpha' })
      var res = validate({ name : 'bhagy _e-sh10' });
      assert.equal( res.message, "name does not match alpha")
    })
  })

  describe('alphanumeric', function () {
    it('pass', function () {
      var validate = parser({ name: 'alphanumeric' })
      var res = validate({ name : 'bhagyesh10' });
      assert.equal( res.message, "validation passed")

      var validate = parser({ name: 'alphanumeric:space,dash,underscope' })
      var res = validate({ name : 'bhagy _e-sh10' });
      assert.equal( res.message, "validation passed")

      var validate = parser({ name: 'alphanumeric:underscope' })
      var res = validate({ name : 'bhagy_esh10' });
      assert.equal( res.message, "validation passed")

      var validate = parser({ name: 'alphanumeric:dash' })
      var res = validate({ name : 'bhagy-esh10' });
      assert.equal( res.message, "validation passed")

      var validate = parser({ name: 'alphanumeric:space' })
      var res = validate({ name : 'bhagy esh10' });
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ name: 'alphanumeric' })
      var res = validate({ name : 'bhagy _e-sh@10' });
      assert.equal( res.message, "name does not match alphanumeric")
    })
  })

  describe('uppercase', function () {
    it('pass', function () {
      var validate = parser({ name: 'uppercase' })
      var res = validate({ name : 'BHAGYESH' });
      assert.equal( res.message, "validation passed")

      var validate = parser({ name: 'uppercase:dash,underscope,space' })
      var res = validate({ name : 'BHAGY _E-SH' });
      assert.equal( res.message, "validation passed")

      var validate = parser({ name: 'uppercase:underscope' })
      var res = validate({ name : 'BHAGY_ESH' });
      assert.equal( res.message, "validation passed")

      var validate = parser({ name: 'uppercase:dash' })
      var res = validate({ name : 'BHAGY-ESH' });
      assert.equal( res.message, "validation passed")

      var validate = parser({ name: 'uppercase:space' })
      var res = validate({ name : 'BHAGY ESH' });
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ name: 'uppercase' })
      var res = validate({ name : 'bhagy ESH' });
      assert.equal( res.message, "name does not match uppercase")
    })
  })

  describe('lowercase', function () {
    it('pass', function () {
      var validate = parser({ name: 'lowercase' })
      var res = validate({ name : 'bhagyesh' });
      assert.equal( res.message, "validation passed")

      var validate = parser({ name: 'lowercase:dash,underscope,space' })
      var res = validate({ name : 'bhagy _e-sh' });
      assert.equal( res.message, "validation passed")

      var validate = parser({ name: 'lowercase:underscope' })
      var res = validate({ name : 'bhagy_esh' });
      assert.equal( res.message, "validation passed")

      var validate = parser({ name: 'lowercase:dash' })
      var res = validate({ name : 'bhagye-sh' });
      assert.equal( res.message, "validation passed")

      var validate = parser({ name: 'lowercase:space' })
      var res = validate({ name : 'bhagy esh' });
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ name: 'lowercase' })
      var res = validate({ name : 'bhagy _e-sh10' });
      assert.equal( res.message, "name does not match lowercase")
    })
  })

  describe('starts_with', function () {
    it('pass', function () {
      var validate = parser({ status: 'starts_with:inactive,delete' })
      var res = validate({ status : 'inactive-world' });
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ status: 'starts_with:inactive,delete' })
      var res = validate({ status : 'active' });
      assert.equal( res.message, "status does not starts with inactive,delete")
    })
    it('insuffient arguments', function () {
      try {
        parser({ id: 'starts_with' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'starts_with', value param is required")
      }
    })
  })

  describe('starts_not_with', function () {
    it('pass', function () {
      var validate = parser({ status: 'starts_not_with:inactive,delete' })
      var res = validate({ status : 'active' });
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ status: 'starts_not_with:inactive,delete' })
      var res = validate({ status : 'delete' });
      assert.equal( res.message, "status does starts with delete")
    })
    it('insuffient arguments', function () {
      try {
        parser({ id: 'starts_not_with' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'starts_not_with', value param is required")
      }
    })
  })

  describe('ends_with', function () {
    it('pass', function () {
      var validate = parser({ status: 'ends_with:inactive,delete' })
      var res = validate({ status : 'all-delete' });
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ status: 'ends_with:inactive,delete' })
      var res = validate({ status : 'all' });
      assert.equal( res.message, "status does not ends with inactive,delete")
    })
    it('insuffient arguments', function () {
      try {
        parser({ id: 'ends_with' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'ends_with', value param is required")
      }
    })
  })

  describe('ends_not_with', function () {
    it('pass', function () {
      var validate = parser({ status: 'ends_not_with:inactive,delete' })
      var res = validate({ status : 'status-active' });
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ status: 'ends_not_with:inactive,delete' })
      var res = validate({ status : 'isdelete' });
      assert.equal( res.message, "status does ends with 'delete'")
    })
    it('insuffient arguments', function () {
      try {
        parser({ id: 'ends_not_with' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'ends_not_with', value param is required")
      }
    })
  })

  describe('contains', function () {
    it('pass', function () {
      var validate = parser({ status: 'contains:in,not' })
      var res = validate({ status : 'inot' });
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ status: 'contains:in,not' })
      var res = validate({ status : 'nothng' });
      assert.equal( res.message, "status does not contains 'in'")
    })
    it('insuffient arguments', function () {
      try {
        parser({ id: 'contains' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'contains', value param is required")
      }
    })
  })

  describe('contains_any', function () {
    it('pass', function () {
      var validate = parser({ status: 'contains_any:in,not' })
      var res = validate({ status : 'note' });
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ status: 'contains_any:in,not' })
      var res = validate({ status : 'betweenvalue' });
      assert.equal( res.message, "status does not contains any of in,not")
    })
    it('insuffient arguments', function () {
      try {
        parser({ id: 'contains_any' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'contains_any', value param is required")
      }
    })
  })
})