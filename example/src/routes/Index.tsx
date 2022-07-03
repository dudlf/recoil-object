import { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { infoAtom } from '../recoil/info'

function App() {
  function Info() {
    const info = useRecoilValue(infoAtom._self)

    return (
      <div>
        <span>root</span>
        <div></div>
        <span>{JSON.stringify(info)}</span>
      </div>
    )
  }

  function Id() {
    const [id, setId] = useRecoilState(infoAtom.id)

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
      const input = inputRef.current
      if (input) {
        input.value = id
      }
    }, [])

    return (
      <div>
        <span>id</span>
        <div></div>
        <input
          ref={inputRef}
          onChange={(e) => {
            setId(e.currentTarget.value)
          }}
        />
      </div>
    )
  }

  function Profile() {
    const profile = useRecoilValue(infoAtom.profile._self)

    return (
      <div>
        <span>profile</span>
        <div></div>
        <span>{JSON.stringify(profile)}</span>
      </div>
    )
  }

  function Name() {
    const [name, setName] = useRecoilState(infoAtom.profile.name)

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
      const input = inputRef.current
      if (input) {
        input.value = name
      }
    }, [])

    return (
      <div>
        <span>profile.name</span>
        <div></div>
        <input
          ref={inputRef}
          onChange={(e) => {
            setName(e.currentTarget.value)
          }}
        />
      </div>
    )
  }

  function Age() {
    const [age, setAge] = useRecoilState(infoAtom.profile.age)

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
      const input = inputRef.current
      if (input) {
        input.value = String(age)
      }
    }, [])

    return (
      <div>
        <span>profile.age</span>
        <div></div>
        <input
          type='number'
          ref={inputRef}
          onChange={(e) => {
            const value = e.currentTarget.value
            const parsed = Number.parseInt(value)
            if (!Number.isNaN(parsed)) {
              setTimeout(() => {
                setAge(parsed)
              }, 3000)
            }
          }}
        />
      </div>
    )
  }

  return (
    <div className='vpack w(100vw) h(100vh)'>
      <div className='vbox gap(20) w(50%) max-width(50%)'>
        <Info />
        <Divider />
        <Id />
        <Divider />
        <Profile />
        <Divider />
        <div className='hbox(fill) space-between'>
          <Name />
          <Divider />
          <Age />
        </div>
      </div>
    </div>
  )
}

function Divider() {
  return <div className='b(1px/solid/gray)' />
}

export default App
