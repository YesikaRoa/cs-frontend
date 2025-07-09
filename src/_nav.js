import CIcon from '@coreui/icons-react'
import { cilNotes, cilPeople, cilUser, cilLocationPin, cilChart } from '@coreui/icons'
import { CNavItem } from '@coreui/react'
import { getUserInfoFromToken } from './utils/auth'

const allNav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Usuarios',
    to: '/users',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Publicaciones',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    to: '/posts',
  },
  {
    component: CNavItem,
    name: 'Mi comunidad',
    to: '/community',
    icon: <CIcon icon={cilLocationPin} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Perfil',
    to: '/profile',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
]

function getNavConfig() {
  const { rol_name } = getUserInfoFromToken() || {}
  if (!rol_name) return null
  if (rol_name === 'Street_Leader') {
    return allNav.filter((item) => ['Dashboard', 'Publicaciones', 'Perfil'].includes(item.name))
  }
  return allNav
}

export default getNavConfig
