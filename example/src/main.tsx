import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import RecoilNexus from 'recoil-nexus'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <RecoilNexus />
      <App />
    </RecoilRoot>
  </React.StrictMode>
)
