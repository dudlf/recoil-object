import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { useRecoilState, useRecoilValue } from 'recoil'
import { helloState } from '../recoil/hello'
import { infoAtom } from '../recoil/info'

export function Hello() {
  const [visited, setVisited] = useRecoilState(helloState.visited)
  const [clicked, setClicked] = useRecoilState(helloState.clicked)
  const id = useRecoilValue(infoAtom.id)

  const location = useLocation()

  useEffect(() => {
    // @ts-ignore
    if (location.state.prev !== location.pathname) {
      setVisited((curr) => curr + 1)
      // strict mode hack
      location.state = { prev: location.pathname }
    }
  }, [])

  useEffect(() => {
    const onPointerDown = () => {
      setClicked((curr) => curr + 1)
    }
    window.addEventListener('pointerdown', onPointerDown)

    return () => {
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [])

  return (
    <div className='vpack w(100vw) h(100vh)'>
      <div className='vpack'>
        <span>Hello you have visited here {visited} times.</span>
        <span>And... you clicked your left mouse button {clicked} times.</span>
        <span>And... your id is {id}</span>
      </div>
    </div>
  )
}

export default Hello
