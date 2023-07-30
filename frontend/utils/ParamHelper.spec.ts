import { describe, test, expect } from 'vitest'
import { ParamHelper } from '~/utils/ParamHelper'

describe('ParamHelper', () => {
  test('getBoolTrue', () => {
    expect(ParamHelper.getBoolTrue(null)).toBe(true)
    expect(ParamHelper.getBoolTrue(true)).toBe(true)
    expect(ParamHelper.getBoolTrue('true')).toBe(true)
    expect(ParamHelper.getBoolTrue('false')).toBe(false)
    expect(ParamHelper.getBoolTrue(false)).toBe(false)
    expect(ParamHelper.getBoolTrue(1)).toBe(true)
    expect(ParamHelper.getBoolTrue(0)).toBe(false)
    expect(ParamHelper.getBoolTrue(-1)).toBe(true)
  })

  test('getBoolFalse', () => {
    expect(ParamHelper.getBoolFalse(null)).toBe(false)
    expect(ParamHelper.getBoolFalse(true)).toBe(true)
    expect(ParamHelper.getBoolTrue('true')).toBe(true)
    expect(ParamHelper.getBoolTrue('false')).toBe(false)
    expect(ParamHelper.getBoolFalse(false)).toBe(false)
    expect(ParamHelper.getBoolTrue(1)).toBe(true)
    expect(ParamHelper.getBoolTrue(0)).toBe(false)
    expect(ParamHelper.getBoolTrue(-1)).toBe(true)
  })

  test('isNotFoundError', () => {
    expect(ParamHelper.isNotFoundError({ code: 'NOT_FOUND' })).toBe(true)
    expect(ParamHelper.isNotFoundError({ code: 'INTERNAL_SERVER_ERROR' })).toBe(false)
  })
})
