# Recoil-Object

## Manage related atoms with object

Manage related atoms with object

## Features

- Manage related atoms as object

## Example

```tsx
// without root atom

import { recoilObject, RecoilObjectDefault, recoilObject } from 'recoil-object'

type Info = {
  id: string
  profile: {
    name: string
    age: number,
  }
}

const infoDefault: RecoilObjectDefault<Info> = {
  id: 'default-id',
  profile: {
    name: 'my-name',
    age: 1,
  },
}

/*
  const infoAtom = {
    id: RecoilState<string>,
    profile: {
      name: RecoilState<string>,
      age: RecoilState<number>
    }
  } 
*/
export const infoAtom = recoilObject({
  key: 'my-info',
  default: infoDefault,
})
```

```tsx
// with root atom (require recoil-nexus)

import { recoilObject, RecoilObjectDefault, recoilObjectWithRoot } from 'recoil-object'

type Info = {
  id: string
  profile: {
    name: string
    age: number,
  }
}

const infoDefault: RecoilObjectDefault<Info> = {
  id: 'default-id',
  profile: {
    name: 'my-name',
    age: 1,
  },
}

/*
  const infoAtom = {
    _self: RecoilState<{
      id: string,
      profile: {
        name: string,
        age: number
      }
    }>
    id: RecoilState<string>,
    profile: {
      _self: RecoilState<{
        name: string,
        age: number
      }>
      name: RecoilState<string>,
      age: RecoilState<number>
    }
  } 
*/
export const infoAtom = recoilObjectWithRoot({
  key: 'my-info',
  default: infoDefault,
})
```

## License

MIT
