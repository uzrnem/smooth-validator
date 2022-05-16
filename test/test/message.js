const parser = require('smooth-validator');
const assert = require('chai').assert;

describe('message', function () {
  it('custom_message', function () {
    var validate = parser({ created_at: 'after:tomorrow' }, {
      message: {
        'created_at.after' : ':variable validation failed'
      }
    })
    var res = validate({ created_at : new Date() });
    assert.equal( res.message, "created_at validation failed")
  })
  it('custom_message_with_params', function () {
    var validate = parser({ sold_at: 'after_or_equals:2022-05-15' }, {
      message: {
        'sold_at.after_or_equals' : ':value comes before :first_value',
      }
    })
    var res = validate({sold_at: '2022-05-14'});
    assert.equal( res.message, "2022-05-14 comes before 2022-05-15")
  })
})