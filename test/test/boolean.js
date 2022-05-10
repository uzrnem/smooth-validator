const parser = require('smooth-validator');
const assert = require('chai').assert;

describe('boolean', function () {
  describe('boolean', function () {
    it('pass', function () {
      var validate = parser({ id: 'boolean' })
      var res = validate({ id : 'false' });
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ id: 'boolean' })
      var res = validate({id: 'fdalse'});
      assert.equal( res.message, "id is not boolean")
    })
    it('extra arguments', function () {
      try {
        parser({ id: 'boolean:-220' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'boolean', no extra params required")
      }
    })
  })
})