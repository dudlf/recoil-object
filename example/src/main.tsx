import loadable from '@loadable/component'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import RecoilNexus from 'recoil-nexus'
import Header from './Header'

const IndexRoute = loadable(() => import('./routes/Index'))
const HelloRoute = loadable(() => import('./routes/Hello'))

ReactDOM.createRoot(document.getElementById('root')!).render(<Main />)

function Main() {
  return (
    <React.StrictMode>
      <RecoilRoot>
        <RecoilNexus />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<IndexRoute />} />
            <Route path='/Hello' element={<HelloRoute />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </React.StrictMode>
  )
}
