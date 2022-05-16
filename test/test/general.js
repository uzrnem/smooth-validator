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
      assert.equal( res.message, "id is not equal to marks")
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