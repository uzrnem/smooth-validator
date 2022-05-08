module.exports = {
  isString : function (value) {
    return typeof value === 'string' || value instanceof String;
  },
  isNumber : function (value) {
    return isFinite(value);
  },
  isArray : function (value) {
    return value && typeof value === 'object' && value.constructor === Array;
  },
  isFunction : function (value) {
    return typeof value === 'function';
  },
  isObject : function (value) {
    return value && typeof value === 'object' && value.constructor === Object;
  },
  isNull : function (value) {
    return value === null;
  },
  isUndefined : function (value) {
    return typeof value === 'undefined';
  },
  isEmpty : function (value) {
    return (
      value === undefined || value === null || value == '' ||
      (typeof value === 'object' && Object.keys(value).length === 0) ||
      (typeof value === 'string' && value.trim().length === 0)
    );
  },
  isBoolean : function (value) {
    return typeof value === 'boolean' || value == 'true' || value == 'false';
  },
  isEmail : function (value) {
    var atpos = value.indexOf("@");
    var dotpos = value.lastIndexOf(".");
    if ( atpos < 1 || dotpos < ( atpos + 2 ) || ( dotpos + 2 ) >= value.length ) {
      return false;
    }
    return true;
  },
  isDate : function (value) {
    return value instanceof Date;
  }
}
