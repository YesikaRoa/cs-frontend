import CIcon from '@coreui/icons-react'
import { cilNotes, cilPeople, cilUser, cilLocationPin, cilChart } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
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
    to: '/charts',
    icon: <CIcon icon={cilLocationPin} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Perfil',
    to: '/profile',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
]
export default _nav
