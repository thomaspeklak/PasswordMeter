(function(define){
define(function(require){
  var defaults = {
    minLength : 8,
    minComplexity: 2,
    upper : true,
    lower : true,
    digits  : false,
    special : false
  },
  regexps = {
    upper : /[A_Z]/g,
    lower : /[A_Z]/g,
    digits: /[0-9]/g,
    special: /[^0-9a-zA-Z]/g
  },
  extend = function(base, extend){
    for(key in extend){
      if(extend.hasOwnProperty(key)){
        base[key] = extend[key];
      }
    }
    return base;
  },

  transform = function(strength, beginning, step, maximum) {
    var beginning = 0,
        step      = 1,
        maximum   = 1;

    if ((strength/=maximum/2) < 1) return step/2*strength*strength + beginning;
    return -step/2 * ((--strength)*(strength-2) - 1) + beginning;
  }

  var PasswordMeter = function (options){
    if(typeof options === 'undefined') { options = {};}
    this.options = extend(defaults, options);
  }

  PasswordMeter.prototype.check = function(password){
    var strength    = 0,
        length      = password.length,
        upper       = (password.match(regexps.upper) || '').length,
        lower       = (password.match(regexps.lower) || '').length,
        digits      = (password.match(regexps.digits) || '').length,
        special     = (password.match(regexps.special) || '').length,
        has_upper   = upper > 0,
        has_lower   = lower > 0,
        has_digits  = digits > 0,
        has_special = special > 0;

    if (length >= this.options.minLength && (has_upper + has_lower + has_digits + has_special) >= this.options.minComplexity) {
      strength = (has_upper + has_lower + has_digits + has_special) * 5 * length * length / this.options.minLength / 100 + .1;
    }

    return transform(Math.min(strength, 1));
  };
  return {PasswordMeter:PasswordMeter};
});
})(typeof define=="function"?define:function(factory){module.exports = factory(require)});
