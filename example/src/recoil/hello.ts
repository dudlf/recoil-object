import { recoilObject, RecoilObjectDefault, recoilObjectWithRoot } from 'recoil-object'

type HelloState = {
  visited: number
  clicked: number
}

const stateDefault: RecoilObjectDefault<HelloState> = {
  visited: 0,
  clicked: 0,
}

export const helloState = recoilObjectWithRoot({
  key: 'hello-state',
  default: stateDefault,
})
