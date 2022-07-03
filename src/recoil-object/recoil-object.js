import { atom } from 'recoil'
import { setRecoil } from 'recoil-nexus'

import { isObject } from '../utils/is-object'

function getEffectsSelf(args, parent, propKey) {
  if (parent) {
    return [
      ...(args.options?.['_self']?.effects || []),
      ({ onSet }) => {
        onSet((newValue) => {
          setRecoil(parent, (currVal) => ({
            ...currVal,
            [propKey]: newValue,
          }))
        })
      },
    ]
  }
  return args.options?.['_self']?.effects || []
}

function getEffectsNode(args, propKey, useRootAtom, _self) {
  if (useRootAtom) {
    return [
      ...(args.options?.[propKey]?.effects || []),
      useRootAtom &&
      (({ onSet }) => {
        onSet((newValue) => {
          setRecoil(_self, (currVal) => ({
            ...currVal,
            [propKey]: newValue,
          }))
        })
      }),
    ]
  }
  return args.options?.[atomKey]?.effects || []
}

function getSelfNode(args, parent, propKey) {
  return atom({
    ...args.options?._self,
    key: args.key,
    default: args.default,
    effects: getEffectsSelf(args, parent, propKey),
  })
}

function createRecoilObject(args, useRootAtom, parent, propKey) {
  const _self = useRootAtom ? getSelfNode(args, parent, propKey) : undefined

  function mapper(e) {
    const [propKey, propVal] = e

    const atomkey = `${args.key}.${String(propKey)}`

    if (isObject(propVal)) {
      return [
        propKey,
        createRecoilObject(
          {
            key: atomkey,
            default: propVal,
            options: args.options?.[propKey],
          },
          useRootAtom,
          _self,
          propKey
        ),
      ]
    }

    return [
      propKey,
      atom({
        ...args.options?.[propKey],
        key: atomkey,
        default: propVal,
        effects: getEffectsNode(args, propKey, useRootAtom, _self),
      }),
    ]
  }

  function reducer(prev, curr) {
    return {
      ...prev,
      [curr[0]]: curr[1],
    }
  }

  return Object.entries(args.default)
    .map(mapper)
    .reduce(reducer, useRootAtom ? { _self } : {})
}

export function recoilObject(args) {
  return createRecoilObject(args, false)
}

export function recoilObjectWithRoot(args) {
  return createRecoilObject(args, true)
}

export default {
  recoilObject,
  recoilObjectWithRoot,
}
