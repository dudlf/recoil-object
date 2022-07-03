import { RecoilState, AtomOptions, RecoilValue, Loadable, WrappedValue } from 'recoil';

type DefaultValue<T> = RecoilValue<T> | Promise<T> | Loadable<T> | WrappedValue<T> | T

type RecoilObject<O extends object> = Readonly<{
  [P in keyof O]: O[P] extends object ? RecoilObject<O[P]> : RecoilState<O[P]>
}>

type RecoilObjectWithRoot<O extends object> = {
  _self: RecoilObjectWithRoot<O>
} & {
  [P in keyof O]: O[P] extends object ? RecoilObject<O[P]> : RecoilState<O[P]>
}

type RecoilObjectDefault<O extends object> = {
  [P in keyof O]: O[P] extends object ? RecoilObjectDefault<O[P]> : DefaultValue<O[P]> | undefined
}

type RecoilObjectOption<O extends object> = {
  [P in keyof O]?: Omit<AtomOptions<O>, 'key' | 'default'>
}

type RecoilObjectWithRootOption<O extends object> = {
  _self: Omit<AtomOptions<O>, 'key' | 'default'>
} & {
  [P in keyof O]?: Omit<AtomOptions<O>, 'key' | 'default'>
}

declare function recoilObject<O extends object>(args: { key: string; default: RecoilObjectDefault<O>; options?: RecoilObjectOption<O> }): RecoilObject<O>

declare function recoilObjectWithRoot<O extends object>(args: { key: string; default: RecoilObjectDefault<O>; options?: RecoilObjectWithRootOption<O> }): RecoilObjectWithRoot<O>

export { RecoilObject, RecoilObjectDefault, RecoilObjectOption, RecoilObjectWithRoot, RecoilObjectWithRootOption, recoilObject, recoilObjectWithRoot };
