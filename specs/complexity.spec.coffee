PasswordMeter = require('../password-meter.js').PasswordMeter

describe 'PasswordMeter', ->
  it 'should return more than .05 if minLength and minComplexity are met', ->
    password_meter = new PasswordMeter(minComplexity:1, minLength:5)
    test = password_meter.check('abcde')
    expect(test).toBeGreaterThan .05

  it 'should return more than .75 if minLength is reached and complexity is full', ->
    password_meter = new PasswordMeter(minComplexity:2, minLength:6)
    test = password_meter.check "12abA$"
    expect(test).toBeGreaterThan 0.75
