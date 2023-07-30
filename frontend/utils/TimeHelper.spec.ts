import { describe, test, expect } from 'vitest'
import { TimeHelper } from '~/utils/TimeHelper'

describe('TimeHelper', () => {
  test('toUTC', () => {
    const date = '2019-10-18 10:32'

    expect(TimeHelper.toUTC(date)).toBe('2019-10-18 03:32')
    expect(TimeHelper.toUTC('miss')).toBe('miss')
  })

  test('toLocal', () => {
    const date = '2019-03-06T00:00:00Z'

    expect(TimeHelper.toLocal(date)).toBe('2019-03-06 07:00')
    expect(TimeHelper.toLocal('miss')).toBe('miss')
  })

  test('getDateFormTimeWithLocal', () => {
    const date = '2019-10-17T20:32:50.000Z'

    expect(TimeHelper.getDateFormTimeWithLocal(date)).toBe('18 ต.ค. 2562')
    const date2 = '2019-10-17T00:32:50.000Z'

    expect(TimeHelper.getDateFormTimeWithLocal(date2)).toBe('17 ต.ค. 2562')
    expect(TimeHelper.getDateFormTimeWithLocal('miss')).toBe('miss')
  })

  test('getISODateTimeFormTime', () => {
    const date = '2019-10-18 03:32:50'

    expect(TimeHelper.getISODateTimeFormTime(date)).toBe('2019-10-17T20:32:50.000Z')
    expect(TimeHelper.getISODateTimeFormTime('miss')).toBe('miss')
  })

  test('getISODateTimeFormTime', () => {
    const date = '2019-10-18 03:32:50'

    expect(TimeHelper.getDateTimeFormTime(date)).toBe('18 ต.ค. 2562 3:32:50 AM')

    const date2 = '2019-10-17T20:32:50.000Z'

    expect(TimeHelper.getDateTimeFormTime(date2)).toBe('18 ต.ค. 2562 3:32:50 AM')
    expect(TimeHelper.getDateTimeFormTime('miss')).toBe('miss')
  })

  test('getTimeFormTime', () => {
    const date = '2019-10-18 03:32:50'

    expect(TimeHelper.getTimeFormTime(date)).toBe('3:32:50 AM')
    expect(TimeHelper.getTimeFormTime('miss')).toBe('miss')
  })
})
