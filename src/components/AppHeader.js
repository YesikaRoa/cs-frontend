import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  useColorModes,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilContrast, cilMenu, cilMoon, cilSun, cilExitToApp } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import defaultProfile from '../assets/images/default-profile6.png'

const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const [userInfo, setUserInfo] = useState(() =>
    JSON.parse(localStorage.getItem('userInfo') || '{}')
  )

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  useEffect(() => {
    const handleUserInfoUpdate = () => {
      setUserInfo(JSON.parse(localStorage.getItem('userInfo') || '{}'))
    }
    window.addEventListener('userInfoUpdated', handleUserInfoUpdate)
    return () => window.removeEventListener('userInfoUpdated', handleUserInfoUpdate)
  }, [])

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4 d-flex align-items-center" fluid>
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>

        <div className="d-flex align-items-center ms-2 me-auto">
          <img
            src={userInfo?.url_image || defaultProfile}
            alt="avatar"
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              objectFit: 'cover',
              marginRight: 10,
              border: '2px solid #eee',
            }}
          />
          <span style={{ fontWeight: 500 }}>¡Bienvenido {userInfo?.first_name} {userInfo?.last_name}!</span>
        </div>

        <CHeaderNav className="align-items-center">
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>

          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false} className="d-flex align-items-center">
              <CIcon icon={cilExitToApp} size="lg" />
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem disabled>{userInfo?.email}</CDropdownItem>
              <CDropdownItem onClick={handleLogout}>
                <CIcon icon={cilExitToApp} className="me-2" />
                Cerrar sesión
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>

          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>

          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CHeaderNav>
      </CContainer>

      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
