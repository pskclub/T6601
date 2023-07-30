import { describe, test, expect } from 'vitest'
import { TransformHelper } from '~/utils/TransformHelper'

describe('TransformHelper', () => {
  test('getSlugFromText', () => {
    expect(TransformHelper.getSlugFromText('long Pskclub  @ 123')).toEqual('long-pskclub--123')
    expect(TransformHelper.getSlugFromText('123 long Pskclub  @  ')).toEqual('123-long-pskclub-')
    expect(TransformHelper.getSlugFromText('123 long Pskclub  @๒๓๔ #$*  หลง')).toEqual(
      '123-long-pskclub-๒๓๔--หลง'
    )
  })

  test('getAliasFromText', () => {
    expect(TransformHelper.getAliasFromText('long Pskclub  @ 123')).toEqual('long-pskclub--123')
    expect(TransformHelper.getAliasFromText('123 long Pskclub  @  ')).toEqual('123-long-pskclub-')
    expect(TransformHelper.getAliasFromText('123 long Pskclub  @๒๓๔ #$*  หลง')).toEqual(
      '123-long-pskclub---'
    )
  })

  test('getOnlyNumber', () => {
    expect(TransformHelper.getOnlyNumber('long Pskclub  @ 123')).toEqual('123')
    expect(TransformHelper.getOnlyNumber('123 long Pskclub  @  ')).toEqual('123')
    expect(TransformHelper.getOnlyNumber('123 long Pskclub  @๒๓๔ #$*  หลง')).toEqual('123')
  })

  test('maskEmail', () => {
    expect(TransformHelper.maskEmail('test1234@email.com')).toEqual('test****@email.com')
    expect(TransformHelper.maskEmail('abc2.er@email.com')).toEqual('abc****@email.com')
    expect(TransformHelper.maskEmail('ws@email.com')).toEqual('w*@email.com')
  })
})
