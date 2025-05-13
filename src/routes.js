import React from 'react'
import Publications from './views/publications/Publications'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Users = React.lazy(() => import('./views/users/Users'))
const MyCommunity = React.lazy(() => import('./views/mycommunity/MyCommunity'))
const Posts = React.lazy(() => import('./views/posts/Posts'))
const Profile = React.lazy(() => import('./views/profile/Profile'))

const routes = [
  { path: '/', exact: true, name: 'Inicio' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/users', name: 'Users', element: Users },
  { path: '/publications', name: 'Publications', element: Publications },
  { path: '/mycommunity', name: 'MyCommunity', element: MyCommunity },
  { path: '/posts', name: 'Posts', element: Posts }, //
  { path: '/profile', name: 'Profile', element: Profile },
]

export default routes
