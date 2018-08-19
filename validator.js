var dataType = require('./dataType');

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
      if (!varValue.match(/^[a-z ]+$/i))
        return { resKey: variable, resMsg : ' is not alphabetic' };
      break;
    case 'alphanumeric':
      if (!varValue.match(/^[a-z 0-9]+$/i))
        return { resKey: variable, resMsg : ' is not alphanumeric'};
      break;
    case 'uppercase':
      if (!varValue.match(/^[A-Z]+$/))
        return { resKey: variable, resMsg : ' is not uppercase'};
      break;
    case 'lowercase':
      if (!varValue.match(/^[a-z]+$/))
        return { resKey: variable, resMsg : ' is not lowercase'};
      break;
    case 'required': break;
    case 'min':
      if (varValue.length < extra)
        return { resKey: variable, resMsg : "'s length is less than " + extra};
      break;
    case 'max':
      if (varValue.length > extra)
        return { resKey: variable, resMsg : "'s length is greater than " + extra};
      break;
    case 'email':
      if (!dataType.isEmail(varValue))
        return { resKey: variable, resMsg : ' is invalid'};
      break;
    case 'in':
      if (extra.indexOf(varValue) < 0)
        return { resKey: variable, resMsg : " is invalid"};
      break;
    case 'date':
      if (!dataType.isDate(varValue))
        return { resKey: variable, resMsg : ' is not date'};
      break;
    case 'numeric':
      if (!dataType.isNumber(varValue))
        return { resKey: variable, resMsg : ' is not number'};
      break;
    case 'nullable': break;
    default :
      return { resKey: variable, resMsg : ' is invalid validator on ' + variable};
      break;
  }
  return { resKey: false, resMsg : null};
}

module.exports = function (data, Validator, type) {
  var error = false;
  var msg = '';
  var errors = [];
  var keyValuePair = false;

  var validation = getValidationArray(Validator);
  keyValuePair = type !== undefined && type;

  for (var [variable,conditions] of Object.entries(Validator)) {
    var nullable = conditions.indexOf('nullable') > -1;
    var required = conditions.indexOf('required') > -1;
    var varValue = data[variable];
    if (required && !varValue && dataType.isEmpty(varValue)) {
      if (error) {
        errors.push({key : variable, message : variable + ' is required'});
      } else {
        error = true;
        msg = variable + ' is required';
        errors.push({key : variable, message : msg});
      }
      continue;
    }
    var varCondition = validation[variable];
    for (var i = 0; i < varCondition.length; i++) {
      var key = varCondition[i]['keys'];
      var extra = varCondition[i]['value'];
      if (!dataType.isEmpty(varValue) || !nullable) {
        var {resKey, resMsg} = checkVariableErrors(variable, varValue, key, extra);
        if (resKey && resMsg) {
            if (error) {
              errors.push({key : resKey, message : resKey + resMsg});
            } else {
              error = true;
              msg = resKey + resMsg;
              errors.push({key : resKey, message : msg});
            }
        }
      }
    }
  }
  return {success: !error, message: msg, errors: errors};
}
