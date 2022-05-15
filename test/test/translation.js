const parser = require('smooth-validator');
const assert = require('chai').assert;

describe('translation', function () {
  it('created_at', function () {
    var validate = parser({ created_at: 'after:tomorrow' }, {
      transalation: {
        'created_at.after' : ':variable validation failed'
      }
    })
    var res = validate({ created_at : new Date() });
    assert.equal( res.message, "created_at validation failed")
  })
  it('sold_at', function () {
    var validate = parser({ sold_at: 'after_or_equals:2022-05-15' }, {
      transalation: {
        'sold_at.after_or_equals' : ':value comes before :firstValue',
      }
    })
    var res = validate({sold_at: '2022-05-14'});
    assert.equal( res.message, "2022-05-14 comes before 2022-05-15")
  })
})