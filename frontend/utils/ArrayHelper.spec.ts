import { describe, test, expect } from 'vitest'
import { ArrayHelper } from '~/utils/ArrayHelper'

describe('ArrayHelper', () => {
  test('toOptions default attr', () => {
    const data = [
      {
        id: '1',
        name: 'long',
      },
      {
        id: '2',
        name: 'long2',
      },
      {
        id: '3',
        name: 'long3',
      },
    ]

    expect(ArrayHelper.toOptions(data)).toEqual([
      {
        value: '1',
        label: 'long',
      },
      {
        value: '2',
        label: 'long2',
      },
      {
        value: '3',
        label: 'long3',
      },
    ])
  })

  test('toOptions custom attr', () => {
    const data = [
      {
        ide: '1',
        wtf: 'long',
      },
      {
        ide: '2',
        wtf: 'long2',
      },
      {
        ide: '3',
        wtf: 'long3',
      },
    ]

    expect(ArrayHelper.toOptions(data, 'ide', 'wtf')).toEqual([
      {
        value: '1',
        label: 'long',
      },
      {
        value: '2',
        label: 'long2',
      },
      {
        value: '3',
        label: 'long3',
      },
    ])
  })

  test('toOptions custom attr nested', () => {
    const data = [
      {
        ide: '1',
        wtf: {
          ed: 'long',
        },
      },
      {
        ide: '2',
        wtf: {
          ed: 'long2',
        },
      },
      {
        ide: '3',
        wtf: 'eiei',
      },
      {},
    ]

    expect(ArrayHelper.toOptions(data, 'ide', 'wtf.ed')).toEqual([
      {
        value: '1',
        label: 'long',
      },
      {
        value: '2',
        label: 'long2',
      },
      {
        value: '3',
        label: '3',
      },
      {
        value: null,
        label: null,
      },
    ])
  })

  test('toArray', () => {
    expect(ArrayHelper.toArray(null)).toEqual([])
    expect(ArrayHelper.toArray([])).toEqual([])
    expect(ArrayHelper.toArray('')).toEqual([])
    expect(ArrayHelper.toArray(false)).toEqual([])
    expect(ArrayHelper.toArray(true)).toEqual([])
    expect(ArrayHelper.toArray({})).toEqual([])
    expect(ArrayHelper.toArray([1, 2, 3])).toEqual([1, 2, 3])
  })
})
