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

export const infoAtom = recoilObjectWithRoot({
  key: 'my-info',
  default: infoDefault,
})
