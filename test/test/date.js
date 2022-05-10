const parser = require('smooth-validator');
const assert = require('chai').assert;

describe('date', function () {
  describe('date', function () {
    it('pass', function () {
      var validate = parser({ datecolumn: 'date' })
      var res = validate({ datecolumn : new Date() });
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ datecolumn: 'date' })
      var res = validate({ datecolumn : 'dmsk' });
      assert.equal( res.message, "datecolumn is not in date format")
    })
    it('extra arguments', function () {
      try {
        parser({ id: 'date:-220' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'date', no extra params required")
      }
    })
  })
})