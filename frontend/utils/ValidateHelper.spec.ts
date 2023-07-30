import { describe, test, expect } from 'vitest'
import { ValidateHelper } from './ValidateHelper'

describe('ValidateHelper', () => {
  test('isSequentialCharacter', () => {
    expect(ValidateHelper.isSequentialCharacter('1234')).toBeTruthy()
    expect(ValidateHelper.isSequentialCharacter('abcd')).toBeTruthy()
    expect(ValidateHelper.isSequentialCharacter('random4567a.')).toBeTruthy()
    expect(ValidateHelper.isSequentialCharacter('randomijklx@')).toBeTruthy()
    expect(ValidateHelper.isSequentialCharacter('4683')).toBeFalsy()
    expect(ValidateHelper.isSequentialCharacter('slox')).toBeFalsy()
    expect(ValidateHelper.isSequentialCharacter('123')).toBeFalsy()
    expect(ValidateHelper.isSequentialCharacter('xyz')).toBeFalsy()
    expect(ValidateHelper.isSequentialCharacter('random5564!x')).toBeFalsy()
    expect(ValidateHelper.isSequentialCharacter('randomggez55')).toBeFalsy()
  })
})
