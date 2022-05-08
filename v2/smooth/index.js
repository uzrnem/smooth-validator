const dataType = require('./dataType');

const validType = ['numeric', 'lowercase', 'uppercase', 'required',
  'numeric', 'date', 'email', 'boolean',
  'alpha', 'alphanumeric', 'alphaunderscope', 'alphadash',
  'max', 'min', 'size', 'same', 'not_in', 'in', 'between'
];
function parseCondition(conditionStr) {
  var details = conditionStr.split(":");
  if (validType.indexOf(details[0]) < 0) {
    throw "Invalid validation " + details[0]
  }
  if (
    ['max', 'min', 'size', 'same'].indexOf(details[0]) > -1 &&
    (details.length < 2 || details[1].split(',').length != 1)
  ) {
    throw "Invalid validation " + conditionStr
  }
  if ('between' == details[0] &&
    (details.length < 2 || details[1].split(',').length != 2)
  ) {
    throw "Invalid validation " + conditionStr
  }
  if ( ['not_in', 'in'].indexOf(details[0]) > -1 &&
    (details.length < 2 || details[1].split(',').length < 1 )
  ) {
    throw "Invalid validation " + conditionStr
  }
  return {
    key: details[0], //validate key name
    value: details.length == 1? null : details[1].split(',') //validate length of value
  }
}

function checkVariableErrors(variable, varValue, data, key, extraCondition) {
  switch (key) {
    case 'alpha':
      if (!varValue.match(/^[a-z ]+$/i))
        return { resKey: variable, resMsg: ' is not alphabetic' };
      break;
    case 'alphanumeric':
      if (!varValue.match(/^[a-z 0-9]+$/i))
        return { resKey: variable, resMsg: ' is not alphanumeric' };
      break;
    case 'alphaunderscope':
      if (!varValue.match(/^[a-z0-9_]+$/i))
        return { resKey: variable, resMsg: ' is not alphaunderscope' };
      break;
    case 'alphadash':
      if (!varValue.match(/^[a-z0-9-]+$/i))
        return { resKey: variable, resMsg: ' is not alphadash' };
      break;
    case 'uppercase':
      if (!varValue.match(/^[A-Z _-]+$/))
        return { resKey: variable, resMsg: ' is not uppercase' };
      break;
    case 'lowercase':
      if (!varValue.match(/^[a-z _-]+$/))
        return { resKey: variable, resMsg: ' is not lowercase' };
      break;
    case 'required':
      if (!varValue && dataType.isEmpty(varValue))
        return { resKey: variable, resMsg: ' is required' };
      break;
    case 'min':
      if (varValue.length < extraCondition[0])
        return { resKey: variable, resMsg: "'s length is less than " + extraCondition[0] };
      break;
    case 'max':
      if (varValue.length > extraCondition[0])
        return { resKey: variable, resMsg: "'s length is greater than " + extraCondition[0] };
      break;
    case 'size':
      if (varValue.length != extraCondition[0])
        return { resKey: variable, resMsg: "'s length not equal to " + extraCondition[0] };
      break;
    case 'between':
      if (varValue < extraCondition[0] || varValue > extraCondition[1])
        return { resKey: variable, resMsg: " should be less than " + extraCondition[0] + " and greater than " + extraCondition[1] };
      break;
    case 'in':
      if (extraCondition.indexOf(varValue) < 0)
        return { resKey: variable, resMsg: " is invalid" };
      break;
    case 'not_in':
      if (extraCondition.indexOf(varValue) > 0)
        return { resKey: variable, resMsg: " is invalid" };
      break;
    case 'email':
      if (!dataType.isEmail(varValue))
        return { resKey: variable, resMsg: ' is invalid' };
      break;
    case 'date':
      if (!dataType.isDate(varValue))
        return { resKey: variable, resMsg: ' is not date' };
      break;
    case 'numeric':
      if (!dataType.isNumber(varValue))
        return { resKey: variable, resMsg: ' is not number' };
      break;
    case 'boolean':
      if (!dataType.isBoolean(varValue))
        return { resKey: variable, resMsg: ' is not boolean' };
      break;
    case 'same':
      if (varValue != data[extraCondition[0]])
        return { resKey: variable, resMsg: ' is not equal to '+extraCondition[0] };
      break;
    default:
      return { resKey: variable, resMsg: ' is invalid validator on ' + variable };
  }
  return { resKey: false, resMsg: null };
}

var parser = function (rawRules) {
  var parsedRules = {};
  for (var [variable, rawConditions] of Object.entries(rawRules)) {
    var parsedConditions = [];
    /* Parse something like this {'name' : 'alpha|max:20'} into name:
     * [{ keys: 'alpha', value: null },
     *  { keys: 'max', value: [Array] } ],
     */
    var condArr = rawConditions.split("|");
    for (var c = 0; c < condArr.length; c++) {
      parsedConditions.push(parseCondition(condArr[c]));
    }
    parsedRules[variable] = parsedConditions;
  }
  return function (data) {
    var errors = [];
    for (var [variable, conditions] of Object.entries(parsedRules)) {
      //console.debug("\nvariable: " +variable)
      var varValue = data[variable];
      var varCondition = parsedRules[variable];
      for (var i = 0; i < varCondition.length; i++) {
        var key = varCondition[i]['key'];
        var extraCondition = varCondition[i]['value'];
        //console.debug("key: "+key+", value: "+ extraCondition)
        if (!dataType.isEmpty(varValue) || key == "required") {
          //console.debug("not empty")
          var {resKey, resMsg} = checkVariableErrors(variable, varValue, data, key, extraCondition);
          if (resKey && resMsg) {
            errors.push({ key: resKey, message: resKey + resMsg })
          }
        }
      }
    }
    return { message: errors.length > 0 ? errors[0]['message']: 'validation passed', errors: errors };
  };
}
module.exports = parser