import { ParamHelper } from '~/utils/ParamHelper'
import { watch } from '#imports'

export const useWatchTrue = (source: () => boolean, cb: (v: boolean, o: boolean) => any) => {
  watch(source, (value: any, oldVal: any) => {
    if (ParamHelper.isChangeWithTrue(value, oldVal)) {
      cb(value, oldVal)
    }
  })
}

export const useWatchFalse = (source: () => boolean, cb: (v: boolean, o: boolean) => any) => {
  watch(source, (value: any, oldVal: any) => {
    if (ParamHelper.isChangeWithFalse(value, oldVal)) {
      cb(value, oldVal)
    }
  })
}

export const useWatchChange = (source: () => any, cb: (v: any, o: any) => any) => {
  watch(source, (value: any, oldVal: any) => {
    if (value !== oldVal) {
      cb(value, oldVal)
    }
  })
}
