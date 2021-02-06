//import check from 'check-types';
declare var require: any;
var check = require('check-types');

class Validation {
  constructor() {
  }

  process(validation, formData) {
    let rules = this.getRules(validation);
    console.log(rules);

    let error:boolean = false;
    let msg:string = '';
    let errors = [];

    for (let [variable,conditions] of rules) {
      let nullable = conditions.indexOf('nullable') > -1;
      let required = conditions.indexOf('required') > -1;
      let varValue = formData[variable];
      if (required && !varValue && check.emptyString(varValue)) {
        if (error) {
          errors.push({key : variable, message : variable + ' is required'});
        } else {
          error = true;
          msg = variable + ' is required';
          errors.push({key : variable, message : msg});
        }
        continue;
      }
      let varCondition = validation[variable];
      for (let i = 0; i < varCondition.length; i++) {
        let key = varCondition[i]['keys'];
        let extra = varCondition[i]['value'];
        if (!check.emptyString(varValue) || !nullable) {
          let {resKey, resMsg} = this.checkVariableErrors(variable, varValue, key, extra);
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

  getRules(validation) {
    let rules:any = {};
    for (let [variable,conditions] of Object.entries(validation)) {
      rules[variable] = this.parseRules(conditions);
    }
    return rules;
  }

  parseRules (variable) {
    let conditions = [];
    if (variable.indexOf('|') > -1) {
      //'name' : 'alpha|alphanumeric|max:20'
      let sltArr: string[] = variable.split("|");
      for (let i = 0; i < sltArr.length; i++) {
        conditions.push(this.getDetailsInConditions(sltArr[i]));
      }
    } else {
      conditions.push(this.getDetailsInConditions(variable));
    }
    return conditions;
  }

  getDetailsInConditions (variable) {
    if (variable.indexOf(':') > -1) {
      let details: string[] = variable.split(":");
      //'name' : 'alpha|alphanumeric|max:20'
      return {keys : details[0], value : this.getAllowedArrayIn(details[1])};
    } else {
      return {keys : variable, value : null};
    }
  }

  getAllowedArrayIn (variable) {
    //  'estado' : 'in:show,hide',
    if (variable.indexOf(',') > -1) {
      let arr: string[] = variable.split(',');
      return arr;
    }
    return variable;
  }

  checkVariableErrors (variable, varValue, key, extra) {
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
        if (!this.isEmail(varValue))
          return { resKey: variable, resMsg : ' is invalid'};
        break;
      case 'in':
        if (extra.indexOf(varValue) < 0)
          return { resKey: variable, resMsg : " is invalid"};
        break;
      case 'date':
        if (!this.isDate(varValue))
          return { resKey: variable, resMsg : ' is not date'};
        break;
      case 'numeric':
        if (!check.number(varValue))
          return { resKey: variable, resMsg : ' is not number'};
        break;
      case 'nullable': break;
      default :
        return { resKey: variable, resMsg : ' is invalid validator on ' + variable};
        break;
    }
    return { resKey: false, resMsg : null};
  }

  isEmail (value:string):boolean {
    let atpos = value.indexOf("@");
    let dotpos = value.lastIndexOf(".");
    if ( atpos < 1 || dotpos < ( atpos + 2 ) || ( dotpos + 2 ) >= value.length ) {
      return false;
    }
    return true;
  }

  isDate (value) {
    return value instanceof Date;
  }
}

export function validator(formData:any, validation:any):any {
  let v = new Validation();
  return v.process(validation, formData);
}
