const parser = require('smooth-validator');
const assert = require('chai').assert;

describe('integer', function () {
  describe('numeric', function () {
    it('pass', function () {
      var validate = parser({ id: 'numeric' })
      var res = validate({ id : '-24.6778' });
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ id: 'numeric' })
      var res = validate({ id : '-24. 6778'});
      assert.equal( res.message, "id is not number")
    })
    it('extra arguments', function () {
      try {
        parser({ id: 'numeric:-220' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'numeric', no extra params required")
      }
    })
  })

  describe('between', function () {
    it('pass', function () {
      var validate = parser({ id: 'between:10,30' })
      var res = validate({ id : 10 });
      assert.equal( res.message, "validation passed")
      var res = validate({ id : 20 });
      assert.equal( res.message, "validation passed")
      var res = validate({ id : 30 });
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ id: 'between:10,30' })
      var res = validate({ id : 9 });
      assert.equal( res.message, "id should be greater than 10 and less than 30")
      var res = validate({ id : 31 });
      assert.equal( res.message, "id should be greater than 10 and less than 30")
    })
    it('insuffient arguments', function () {
      try {
        parser({ id: 'between:10' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'between', min and mix params are required")
      }
    })
    it('extra arguments', function () {
      try {
        parser({ id: 'between:-20,0,20' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'between', only min and mix params are allowed")
      }
    })
  })

  describe('gt', function () {
    it('pass', function () {
      var validate = parser({ id: 'gt:10|gt:marks' })
      var res = validate({ id : 10.1, marks: 10 });
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ id: 'gt:10' })
      var res = validate({ id : 10 });
      assert.equal( res.message, "id should be greater than 10")
      var res = validate({ id : 9 });
      assert.equal( res.message, "id should be greater than 10")
      var validate = parser({ id: 'gt:marks' })
      var res = validate({ id : 10, marks: 10 });
      assert.equal( res.message, "id should be greater than marks")
      var res = validate({ id : 9, marks: 10 });
      assert.equal( res.message, "id should be greater than marks")
    })
    it('insuffient arguments', function () {
      try {
        parser({ id: 'gt' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'gt', value param is required")
      }
    })
    it('extra arguments', function () {
      try {
        parser({ id: 'gt:-20,0' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'gt', only one value param is allowed")
      }
    })
  })

  describe('gte', function () {
    it('pass', function () {
      var validate = parser({ id: 'gte:10|gte:marks' })
      var res = validate({ id : 10, marks: 10 });
      assert.equal( res.message, "validation passed")
      var res = validate({ id : 11, marks: 10 });
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ id: 'gte:10' })
      var res = validate({ id : 9.9 });
      assert.equal( res.message, "id should be greater than or equals to 10")
      var validate = parser({ id: 'gte:marks' })
      var res = validate({ id : 9.9, marks: 10 });
      assert.equal( res.message, "id should be greater than or equals to marks")
    })
    it('insuffient arguments', function () {
      try {
        parser({ id: 'gte' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'gte', value param is required")
      }
    })
    it('extra arguments', function () {
      try {
        parser({ id: 'gte:-20,0' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'gte', only one value param is allowed")
      }
    })
  })

  describe('lt', function () {
    it('pass', function () {
      var validate = parser({ id: 'lt:10|lt:marks' })
      var res = validate({ id : 9.9, marks: 10 });
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ id: 'lt:10' })
      var res = validate({ id : 10 });
      assert.equal( res.message, "id should be less than 10")
      var res = validate({ id : 11 });
      assert.equal( res.message, "id should be less than 10")
      var validate = parser({ id: 'lt:marks' })
      var res = validate({ id : 10, marks: 10 });
      assert.equal( res.message, "id should be less than marks")
      var res = validate({ id : 11, marks: 10 });
      assert.equal( res.message, "id should be less than marks")
    })
    it('insuffient arguments', function () {
      try {
        parser({ id: 'lt' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'lt', value param is required")
      }
    })
    it('extra arguments', function () {
      try {
        parser({ id: 'lt:-20,0' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'lt', only one value param is allowed")
      }
    })
  })

  describe('lte', function () {
    it('pass', function () {
      var validate = parser({ id: 'lte:10|lte:marks' })
      var res = validate({ id : 10, marks: 10 });
      assert.equal( res.message, "validation passed")
      var res = validate({ id : 9, marks: 10 });
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ id: 'lte:10' })
      var res = validate({ id : 10.1 });
      assert.equal( res.message, "id should be less than or equals to 10")
      var validate = parser({ id: 'lte:marks' })
      var res = validate({ id : 10.1, marks: 10 });
      assert.equal( res.message, "id should be less than or equals to marks")
    })
    it('insuffient arguments', function () {
      try {
        parser({ id: 'lte' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'lte', value param is required")
      }
    })
    it('extra arguments', function () {
      try {
        parser({ id: 'lte:-20,0' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'lte', only one value param is allowed")
      }
    })
  })
})