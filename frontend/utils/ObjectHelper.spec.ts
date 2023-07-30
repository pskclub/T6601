import { describe, test, expect } from 'vitest'
import { ObjectHelper } from '~/utils/ObjectHelper'

describe('ObjectHelper', () => {
  test('CreateOption', () => {
    expect(ObjectHelper.createOption('1', 'eiei')).toEqual({
      value: '1',
      label: 'eiei',
    })
  })

  test('getStatus', () => {
    expect(
      ObjectHelper.toStatus({
        data: 1,
        options: {},
        isLoading: true,
        isLoaded: false,
        isSuccess: true,
        isError: false,
        errorData: null,
      })
    ).toEqual({
      isLoading: true,
      isLoaded: false,
      isSuccess: true,
      isError: false,
      errorData: null,
    })
  })
})
