import { Link, useLocation } from 'react-router-dom'

export function Header() {
  const location = useLocation()

  const navClassName = 'pack w(60) h(30) b(1px/solid/blue) p(5) r(5)'

  return (
    <div className='hpack mt(20) gap(30)'>
      <div className={navClassName}>
        <Link to='/' state={{ prev: location.pathname }}>
          Index
        </Link>
      </div>
      <div className={navClassName}>
        <Link to='/Hello' state={{ prev: location.pathname }}>
          Hello
        </Link>
      </div>
    </div>
  )
}

export default Header
