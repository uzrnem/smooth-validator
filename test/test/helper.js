const helper = require('smooth-validator/helper');
const assert = require('chai').assert;

describe('helper', function () {
  it('number_to_string', function () {
    assert.equal( helper.toString(0), "zero")
    assert.equal( helper.toString(4), "four")
    assert.equal( helper.toString(13), "thirteen")
    assert.equal( helper.toString(20), "twenty")
    assert.equal( helper.toString(21), "twentyone")
    assert.equal( helper.toString(40), "forty")
    assert.equal( helper.toString(60), "sixty")
    assert.equal( helper.toString(63), "sixtythree")
    assert.equal( helper.toString(100), "hundred")
    assert.equal( helper.toString(109), "hundred")
  })
  it('get_unindex_key_and_object', function () {

    var key = 'books.emails[20].admin.emails[11]'
    
    var [newKey, object] = helper.getUnindexKeyAndObject(key)

    assert.equal( newKey, "books.emails[].admin.emails[]")
  })
})


