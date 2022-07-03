import { atom } from 'recoil'
import { setRecoil } from 'recoil-nexus'

import { isObject } from '../utils/is-object'

function getEffectsSelf(args, parent) {
  if (parent) {
    return [
      ...(args.options?.['_self']?.effects || []),
      ({ onSet }) => {
        onSet((newValue) => {
          setRecoil(parent, (currVal) => ({
            ...currVal,
            [args.key]: newValue,
          }))
        })
      },
    ]
  }
  return args.options?.['_self']?.effects || []
}

function getEffectsNode(args, propKey, useRootAtom) {
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
  return args.options?.[propKey]?.effects || []
}

function createRecoilObject(args, useRootAtom, parent) {
  const _self = useRootAtom
    ? atom({
      ...args.options?._self,
      key: args.key,
      default: args.default,
      effects: getEffectsSelf(args, parent),
    })
    : undefined

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
          _self
        ),
      ]
    }

    return [
      propKey,
      atom({
        ...args.options?.[propKey],
        key: atomkey,
        default: propVal,
        effects: getEffectsNode(args, propKey, useRootAtom),
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

function recoilObject(args) {
  return createRecoilObject(args, false)
}

function recoilObjectWithRoot(args) {
  return createRecoilObject(args, true)
}

export default {
  recoilObject,
  recoilObjectWithRoot,
}
