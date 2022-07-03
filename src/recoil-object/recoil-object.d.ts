import { AtomOptions, Loadable, RecoilState, RecoilValue, WrappedValue } from 'recoil'

type DefaultValue<T> = RecoilValue<T> | Promise<T> | Loadable<T> | WrappedValue<T> | T

export type RecoilObject<O extends object> = Readonly<{
  [P in keyof O]: O[P] extends object ? RecoilObject<O[P]> : RecoilState<O[P]>
}>

export type RecoilObjectWithRoot<O extends object> = {
  _self: RecoilObjectWithRoot<O>
} & {
  [P in keyof O]: O[P] extends object ? RecoilObject<O[P]> : RecoilState<O[P]>
}

export type RecoilObjectDefault<O extends object> = {
  [P in keyof O]: O[P] extends object ? RecoilObjectDefault<O[P]> : DefaultValue<O[P]> | undefined
}

export type RecoilObjectOption<O extends object> = {
  [P in keyof O]?: Omit<AtomOptions<O>, 'key' | 'default'>
}

export type RecoilObjectWithRootOption<O extends object> = {
  _self: Omit<AtomOptions<O>, 'key' | 'default'>
} & {
  [P in keyof O]?: Omit<AtomOptions<O>, 'key' | 'default'>
}

export function recoilObject<O extends object>(args: { key: string; default: RecoilObjectDefault<O>; options?: RecoilObjectOption<O> }): RecoilObject<O>

export function recoilObjectWithRoot<O extends object>(args: { key: string; default: RecoilObjectDefault<O>; options?: RecoilObjectWithRootOption<O> }): RecoilObjectWithRoot<O>
