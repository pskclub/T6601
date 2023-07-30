import lodash from 'lodash'

export const _get = lodash.get

export const _range = lodash.range

export const _concat = lodash.concat

export const _toNumber = lodash.toNumber

export const _isUndefined = lodash.isUndefined

export const _dropRight = lodash.dropRight

export const _intersection = lodash.intersection

export const _set = lodash.set

export const _map = lodash.map

export const _flatDeep = lodash.flattenDeep

export const _uniq = lodash.uniq

export const _sortBy = lodash.sortBy

export const _uniqBy = lodash.uniqBy

export const _random = lodash.random

export const _cloneDeep = lodash.cloneDeep

export const _isEmpty = lodash.isEmpty

export const _isObject = lodash.isObject

export const _isArray = lodash.isArray

export const _findIndex = lodash.findIndex

export const _isEqual = lodash.isEqual

export const _difference = lodash.difference

export const _shuffle = lodash.shuffle

export const _size = lodash.size

export const _toPairs = lodash.toPairs

export const _orderBy = lodash.orderBy

export const _fromPairs = lodash.fromPairs

export const _xor = lodash.xor

export const _clone = (object: any): any => {
  try {
    return JSON.parse(JSON.stringify(object || {}))
  } catch (e) {
    return {}
  }
}

export const _debounce = <T extends (...args: any[]) => any>(func: T, wait = 150) => {
  return lodash.debounce(func, wait)
}
