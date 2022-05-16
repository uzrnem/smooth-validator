const parser = require('smooth-validator');
const assert = require('chai').assert;

describe('hierarchy', function () {
  it('array', function () {
    rules = {
      '*emailTo': ["email"],
    }

    var validate = parser(rules, {
      message: {
        'emailTo[].email': ':variable failed :type at index :zero'
      }
    })

    data = {
      emailTo: ["bsp@gmail.com"]
    }
    var res = validate(data);
    assert.equal( res.message, "validation passed")

    data = {
      emailTo: ["bsp@gmail.com", "fdfsdf"]
    }
    var res = validate(data);
    assert.equal( res.message, "emailTo failed email at index 1")

    var res = validate({
      emailTo: []
    });
    assert.equal( res.message, "emailTo is required")

  })

  it('object', function () {
    rules = {
      'address': {
        'colony': "required",
        'city': "required",
        'pincode': "required",
      }
    }
    var validate = parser(rules)
    data = {
      address: {
        colony: "b-sector",
        city: "pune",
        pincode: 412115
      }
    }
    var res = validate(data);
    assert.equal( res.message, "validation passed")

    data = {
      address: {
        colony: "b-sector",
        pincode: 412115
      }
    }
    var res = validate(data);
    assert.equal( res.message, "address.city is required")
  })

  it('array_in_object', function () {
    rules = {
      '*address': {
        '*near': ["max:12|uppercase"],
      }
    }
    var validate = parser(rules)
    data = {
      address: {
        near: ["BSECTOR", "DSECTOR"],
      }
    }
    var res = validate(data);
    assert.equal( res.message, "validation passed")

    data = {
      address: {
        near: ["BSECTOR", "DSECTORDSECTOR"],
      }
    }
    var res = validate(data);
    assert.equal( res.message, "address.near's length is greater than 12")

    data = {
      address: {
        near: ["BSECTOR", "dsector"],
      }
    }
    var res = validate(data);
    assert.equal( res.message, "address.near does not match uppercase")
  })

  it('object_in_object', function () {
    rules = {
      '*address': {
        '*parent': {
          'name': "required",
          '*names': ["min:4"]
        }
      }
    }
    var validate = parser(rules)
    data = {
      address: {
        parent: {
          name: "Maharastra",
          names: ["pune", "puna"]
        }
      }
    }
    var res = validate(data);
    assert.equal( res.message, "validation passed")

    data = {
      address: {
        parent: {
          names: ["pune", "puna"]
        }
      }
    }
    var res = validate(data);
    assert.equal( res.message, "address.parent.name is required")

    data = {
      address: {
        parent: {
          name: "Maharastra",
          names: []
        }
      }
    }
    var res = validate(data);
    assert.equal( res.message, "address.parent.names is required")
  })

  it('object_in_array_in_object', function () {
    rules = {
      '*books': [
        {
          'name': "required"
        }
      ]
    }
    var validate = parser(rules)
    data = {
      books: [
        {
          name: "Type of Validator"
        }
      ]
    }
    var res = validate(data);
    assert.equal( res.message, "validation passed")

    data = {
      books: [
        {
          name: ""
        }
      ]
    }
    var res = validate(data);
    assert.equal( res.message, "books.name is required")

    var res = validate({});
    assert.equal( res.message, "books is required")
  })

  it('object_object_in_array_in_object', function () {
    rules = {
      '*books': [
        {
          '*author': {
            'name': "required"
          }
        }
      ]
    }
    var validate = parser(rules)
    data = {
      books: [
        {
          author: { name: "bhagyesh patel" }
        }
      ]
    }
    var res = validate(data);
    assert.equal( res.message, "validation passed")

    data = {
      books: [
        {
          author: { name: "" }
        }
      ]
    }
    var res = validate(data);
    assert.equal( res.message, "books.author.name is required")

    data = {
      books: [
        {
        }
      ]
    }
    var res = validate(data);
    assert.equal( res.message, "books.author is required")
  })

  it('array_in_object_in_array_in_object', function () {
    rules = {
      '*books': [
        {
          '*emails': ["email"]
        }
      ]
    }
    var validate = parser(rules)
    data = {
      books: [
        {
          emails: ["bsp@gmail.com"]
        }
      ]
    }
    var res = validate(data);
    assert.equal( res.message, "validation passed")

    data = {
      books: [
        {
          emails: ["bsp.com"]
        }
      ]
    }
    var res = validate(data);
    assert.equal( res.message, "books.emails is invalid")

    data = {
      books: [
        {
          emails: []
        }
      ]
    }
    var res = validate(data);
    assert.equal( res.message, "books.emails is required")
  })
})