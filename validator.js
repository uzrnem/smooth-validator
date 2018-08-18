var dataType = require('./dataType');

var error = false;
var msg = '';
var errors = [];
var keyValuePair = false;

var setValidationError = function (key, string) {
  if (!error) {
    error = true;
    msg = key + string;
  }
  if (keyValuePair) {
    errors[key] = key + string;
  } else {
    errors.push({key : key, message : key + string});
  }
}

var getAllowedArrayIn = function (variable) {
  if (variable.indexOf(',') > -1) {
    var arr = variable.split(',');
    return arr;
  }
  return variable;
}

var getDetailsInConditions = function (variable) {
  if (variable.indexOf(':') > -1) {
    var details = variable.split(":");
    return {keys : details[0], value : getAllowedArrayIn(details[1])};
  } else {
    return {keys : variable, value : null};
  }
}

var getConditionsSeprately = function (variable) {
  var conditions = [];
  if (variable.indexOf('|') > -1) {
    var sltArr = variable.split("|");
    for (var i = 0; i < sltArr.length; i++) {
      conditions.push(getDetailsInConditions(sltArr[i]));
    }
  } else {
    conditions.push(getDetailsInConditions(variable));
  }
  return conditions;
}

var getValidationArray = function (Validator) {
  var dataObj = {};
  for (var [variable,conditions] of Object.entries(Validator)) {
    dataObj[variable] = getConditionsSeprately(conditions);
  }
  return dataObj;
}

var checkVariableErrors = function (variable, varValue, key, extra) {
  switch (key) {
    case 'alpha':
      if (!varValue.match(/^[a-z ]+$/i)) setValidationError(variable, ' is not alphabetic');
      break;
    case 'alphanumeric':
      if (!varValue.match(/^[a-z 0-9]+$/i)) setValidationError(variable, ' is not alphanumeric');
      break;
    case 'uppercase':
      if (!varValue.match(/^[A-Z]+$/)) setValidationError(variable, ' is not uppercase');
      break;
    case 'lowercase':
      if (!varValue.match(/^[a-z]+$/)) setValidationError(variable, ' is not lowercase');
      break;
    case 'required': break;
    case 'min':
      if (varValue.length < extra) setValidationError(variable, "'s length is less than " + extra);
      break;
    case 'max':
      if (varValue.length > extra) setValidationError(variable, "'s length is greater than " + extra);
      break;
    case 'email':
      if (!dataType.isEmail(varValue)) setValidationError(variable, ' is not email');
      break;
    case 'in':
      if (extra.indexOf(varValue) < 0) setValidationError(variable, "'s is invalid");
      break;
    case 'date':
      if (!dataType.isDate(varValue)) setValidationError(variable, ' is not date');
      break;
    case 'numeric':
      if (!dataType.isNumber(varValue)) setValidationError(variable, ' is not number');
      break;
    case 'nullable': break;
    default :
      setValidationError(key, ' is invalid validator on ' + variable);
      break;
  }
}

module.exports = function (data, Validator, type) {
  var validation = getValidationArray(Validator);
  keyValuePair = type !== undefined && type;

  for (var [variable,conditions] of Object.entries(Validator)) {
    var nullable = conditions.indexOf('nullable') > -1;
    var required = conditions.indexOf('required') > -1;
    var varValue = data[variable];
    if (required && !varValue && dataType.isEmpty(varValue)) {
      setValidationError(variable, ' is required');
      continue;
    }
    var varCondition = validation[variable];
    for (var i = 0; i < varCondition.length; i++) {
      var key = varCondition[i]['keys'];
      var extra = varCondition[i]['value'];
      if (!dataType.isEmpty(varValue) || !nullable) {
        checkVariableErrors(variable, varValue, key, extra);
      }
    }
  }
  return {success: !error, message: msg, errors: errors};
}
