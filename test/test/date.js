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

  describe('after', function () {
    it('pass', function () {
      var validate = parser({ datecolumn: 'after:yesterday' })
      var res = validate({ datecolumn : new Date() });
      assert.equal( res.message, "validation passed")

      var validate = parser({ datecolumn: 'after:created_at' })
      var res = validate({ datecolumn : '2022-05-15', created_at: '2022-05-14' });
      assert.equal( res.message, "validation passed")

      var validate = parser({ datecolumn: 'after:2022-05-14' })
      var res = validate({ datecolumn : '2022-05-15' });
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ datecolumn: 'after:tomorrow' })
      var res = validate({ datecolumn : new Date() });
      assert.equal( res.message, "datecolumn is not after tomorrow")

      var validate = parser({ datecolumn: 'after:2022-09-10' })
      var res = validate({ datecolumn : '2022-09-10' });
      assert.equal( res.message, "datecolumn is not after 2022-09-10")

      var validate = parser({ datecolumn: 'after:created_at' })
      var res = validate({ datecolumn : '2022-09-10', created_at: '2022-09-10' });
      assert.equal( res.message, "datecolumn is not after created_at")
    })
    it('insuffient arguments', function () {
      try {
        parser({ id: 'after' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'after', value param is required")
      }
    })
    it('extra arguments', function () {
      try {
        parser({ id: 'after:-2,20' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'after', only one value param is allowed")
      }
    })
  })

  describe('after_or_equals', function () {
    it('pass', function () {
      var validate = parser({ datecolumn: 'after_or_equals:yesterday' })
      var res = validate({ datecolumn : new Date() });
      assert.equal( res.message, "validation passed")

      var validate = parser({ datecolumn: 'after_or_equals:today' })
      var res = validate({ datecolumn : new Date() });
      assert.equal( res.message, "validation passed")

      var validate = parser({ datecolumn: 'after_or_equals:created_at' })
      var res = validate({ datecolumn : '2022-05-15', created_at: '2022-05-14' });
      assert.equal( res.message, "validation passed")
      var res = validate({ datecolumn : '2022-05-15', created_at: '2022-05-15' });
      assert.equal( res.message, "validation passed")

      var validate = parser({ datecolumn: 'after_or_equals:2022-05-14' })
      var res = validate({ datecolumn : '2022-05-15' });
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ datecolumn: 'after_or_equals:tomorrow' })
      var res = validate({ datecolumn : new Date() });
      assert.equal( res.message, "datecolumn is not after or equals to tomorrow")

      var validate = parser({ datecolumn: 'after_or_equals:2022-09-10' })
      var res = validate({ datecolumn : '2022-09-09' });
      assert.equal( res.message, "datecolumn is not after or equals to 2022-09-10")

      var validate = parser({ datecolumn: 'after_or_equals:created_at' })
      var res = validate({ datecolumn : '2022-09-09', created_at: '2022-09-10' });
      assert.equal( res.message, "datecolumn is not after or equals to created_at")
    })
    it('insuffient arguments', function () {
      try {
        parser({ id: 'after_or_equals' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'after_or_equals', value param is required")
      }
    })
    it('extra arguments', function () {
      try {
        parser({ id: 'after_or_equals:-2,20' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'after_or_equals', only one value param is allowed")
      }
    })
  })

  describe('before', function () {
    it('pass', function () {
      var validate = parser({ datecolumn: 'before:tomorrow' })
      var res = validate({ datecolumn : new Date() });
      assert.equal( res.message, "validation passed")

      var validate = parser({ datecolumn: 'before:created_at' })
      var res = validate({ datecolumn : '2022-05-15', created_at: '2022-05-16' });
      assert.equal( res.message, "validation passed")

      var validate = parser({ datecolumn: 'before:2022-05-14' })
      var res = validate({ datecolumn : '2022-05-13' });
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ datecolumn: 'before:yesterday' })
      var res = validate({ datecolumn : new Date() });
      assert.equal( res.message, "datecolumn is not before yesterday")

      var validate = parser({ datecolumn: 'before:2022-09-10' })
      var res = validate({ datecolumn : '2022-09-10' });
      assert.equal( res.message, "datecolumn is not before 2022-09-10")

      var validate = parser({ datecolumn: 'before:created_at' })
      var res = validate({ datecolumn : '2022-09-10', created_at: '2022-09-10' });
      assert.equal( res.message, "datecolumn is not before created_at")
    })
    it('insuffient arguments', function () {
      try {
        parser({ id: 'before' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'before', value param is required")
      }
    })
    it('extra arguments', function () {
      try {
        parser({ id: 'before:-2,20' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'before', only one value param is allowed")
      }
    })
  })

  describe('before_or_equals', function () {
    it('pass', function () {
      var validate = parser({ datecolumn: 'before_or_equals:tomorrow' })
      var res = validate({ datecolumn : new Date() });
      assert.equal( res.message, "validation passed")

      var validate = parser({ datecolumn: 'before_or_equals:today' })
      var res = validate({ datecolumn : new Date() });
      assert.equal( res.message, "validation passed")

      var validate = parser({ datecolumn: 'before_or_equals:created_at' })
      var res = validate({ datecolumn : '2022-05-14', created_at: '2022-05-14' });
      assert.equal( res.message, "validation passed")
      var res = validate({ datecolumn : '2022-05-14', created_at: '2022-05-15' });
      assert.equal( res.message, "validation passed")

      var validate = parser({ datecolumn: 'before_or_equals:2022-05-16' })
      var res = validate({ datecolumn : '2022-05-15' });
      assert.equal( res.message, "validation passed")
    })
    it('fail', function () {
      var validate = parser({ datecolumn: 'before_or_equals:yesterday' })
      var res = validate({ datecolumn : new Date() });
      assert.equal( res.message, "datecolumn is not before or equals to yesterday")

      var validate = parser({ datecolumn: 'before_or_equals:2022-09-10' })
      var res = validate({ datecolumn : '2022-09-11' });
      assert.equal( res.message, "datecolumn is not before or equals to 2022-09-10")

      var validate = parser({ datecolumn: 'before_or_equals:created_at' })
      var res = validate({ datecolumn : '2022-09-11', created_at: '2022-09-10' });
      assert.equal( res.message, "datecolumn is not before or equals to created_at")
    })
    it('insuffient arguments', function () {
      try {
        parser({ id: 'before_or_equals' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'before_or_equals', value param is required")
      }
    })
    it('extra arguments', function () {
      try {
        parser({ id: 'before_or_equals:-2,20' })
      }
      catch(err) {
        assert.equal(err, "Invalid validation 'before_or_equals', only one value param is allowed")
      }
    })
  })
})