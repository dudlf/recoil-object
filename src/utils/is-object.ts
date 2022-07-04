import { RecoilLoadable } from 'recoil'
import { isPromise } from './is-promise'

export function isObject(obj: any) {
  return obj !== null && typeof obj === 'object' && !isPromise(obj) && !RecoilLoadable.isLoadable(obj)
}

export default {
  isObject,
}
