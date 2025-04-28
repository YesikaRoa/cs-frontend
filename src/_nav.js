import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilNotes,
  cilPeople,
  cilHome,
  cilLocationPin,
  cilChart,
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Apartados',
  },
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Perfil',
    to: '/Profile',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Usuarios',
    to: '/Users',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Publicaciones', //Aqui cualquier cosa "corre"
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    to: '/Posts',
  },
  {
    component: CNavItem,
    name: 'Mi comunidad',
    to: '/charts',
    icon: <CIcon icon={cilLocationPin} customClassName="nav-icon" />,
  },
]
export default _nav
