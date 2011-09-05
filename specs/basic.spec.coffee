PasswordMeter = require('../password-meter.js').PasswordMeter

describe 'PasswordMeter', ->
  it 'should be able to make a new password meter object with custom options', ->
    password_meter = new PasswordMeter(minLength:9, special:true)
    expect(password_meter).toBeDefined()

  it 'should be able to check a password', ->
    password_meter = new PasswordMeter
    test = password_meter.check 'test'
    expect(test).toBeDefined()
    expect(test).tobe
    expect(test).toBeGreaterThan -1
    expect(test).toBeLessThan 101

  it 'should be less than .1 as long as the length is less than minLength', ->
    password_meter = new PasswordMeter(minLength:12)
    test = password_meter.check '12345678Aa$'
    expect(test).toBeLessThan .1

  it 'should be less than .1 as long as the minComplexity is not met', ->
    password_meter = new PasswordMeter(minComplexity:3)
    test = password_meter.check '1234567890abcdefghijklmnopq'
    expect(test).toBeLessThan .1
