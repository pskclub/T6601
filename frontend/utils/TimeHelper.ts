import moment from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import duration from 'dayjs/plugin/duration'
import buddhistEra from 'dayjs/plugin/buddhistEra'

import 'dayjs/locale/th'

moment.locale('th')
moment.extend(buddhistEra)
moment.extend(relativeTime)
moment.extend(utc)
moment.extend(timezone)
moment.extend(duration)

const isTimeError = (time: any) => time === 'Invalid Date'
const timeWrapper = (time: any, defaultTime: string) => (isTimeError(time) ? defaultTime : time)

const dateFormat = 'DD MMM BBBB'
const dateTimeFormat = 'DD MMM BBBB h:mm:ss A'
const commonDateTimeFormat = 'YYYY-MM-DD HH:mm'
const timeFormat = 'h:mm:ss A'
const myTimezone = 'Asia/Bangkok'

export class TimeHelper {
  static toUTC = (time: string): string => {
    if (!time) {
      return time
    }

    try {
      const newTime = moment(time).utc().format(commonDateTimeFormat)

      return timeWrapper(newTime, time)
    } catch (e) {
      return time.toString()
    }
  }

  static toLocal = (time: string): string => {
    if (!time) {
      return time
    }

    try {
      const newTime = moment(time).tz(myTimezone).format(commonDateTimeFormat)

      return timeWrapper(newTime, time)
    } catch (e) {
      return time
    }
  }

  static getCurrentDate = (): string => {
    const newTime = moment().format(dateFormat)

    return timeWrapper(newTime, '')
  }

  static getDateFormTime = (time: string): string => {
    if (!time) {
      return time
    }

    const newTime = moment(time).format(dateFormat)

    return timeWrapper(newTime, time)
  }

  static getDateFormTimeWithLocal = (time: string): string => {
    if (!time) {
      return time
    }

    const newTime = moment(TimeHelper.toLocal(time)).format(dateFormat)

    return timeWrapper(newTime, time)
  }

  static getISODateTimeFormTime = (time: string): string => {
    if (!time) {
      return time
    }

    const testTime = moment(time).format(dateTimeFormat)

    if (isTimeError(testTime)) {
      return time
    }

    const newTime = moment(time).toISOString()

    return isTimeError(newTime) || !newTime ? time : newTime
  }

  static getDateTimeFormTime = (time: string): string => {
    if (!time) {
      return time
    }

    const newTime = moment(time).format(dateTimeFormat)

    return timeWrapper(newTime, time)
  }

  static getTimeFormTime = (time: string): string => {
    if (!time) {
      return time
    }

    const newTime = moment(time).format(timeFormat)

    return timeWrapper(newTime, time)
  }

  static getCurrentDateTime = (): string => {
    const newTime = moment().format(dateTimeFormat)

    return timeWrapper(newTime, '')
  }

  static getDateForFilter = (time: string): string => {
    return moment(time).format('YYYY-MM-DD')
  }

  static getDiffTime = (time: string): string => {
    if (!time) {
      return time
    }

    const newTime = moment(time).fromNow()

    return timeWrapper(newTime, time)
  }
}
