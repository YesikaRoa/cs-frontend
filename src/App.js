import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'


const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

const Login = React.lazy(() => import('./views/pages/login/Login'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))


const isAuthenticated = () => localStorage.getItem('userToken') !== null

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }
    if (!isColorModeSet()) {
      setColorMode(storedTheme)
    }
  }, []) 

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" name="Login Page" element={<Login />} />
          <Route path="/404" name="Page 404" element={<Page404 />} />
          <Route path="/500" name="Page 500" element={<Page500 />} />
          <Route path="*" name="Home" element={isAuthenticated() ? <DefaultLayout /> : <Navigate to="/login" />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App

