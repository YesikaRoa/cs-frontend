import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Users = React.lazy(() => import('./views/users/Users'))
const Community = React.lazy(() => import('./views/community/Community'))
const Posts = React.lazy(() => import('./views/posts/Posts'))
const Profile = React.lazy(() => import('./views/profile/Profile'))

const routes = [
  { path: '/', exact: true, name: 'Inicio' },
  {
    path: '/dashboard',
    name: 'Dashboard',
    element: Dashboard,
    roles: ['Admin', 'Community_Leader', 'Street_Leader'],
  },
  { path: '/users', name: 'Users', element: Users, roles: ['Admin', 'Community_Leader'] },
  {
    path: '/community',
    name: 'Community',
    element: Community,
    roles: ['Admin', 'Community_Leader'],
  },
  {
    path: '/posts',
    name: 'Posts',
    element: Posts,
    roles: ['Admin', 'Community_Leader', 'Street_Leader'],
  },
  {
    path: '/profile',
    name: 'Profile',
    element: Profile,
    roles: ['Admin', 'Community_Leader', 'Street_Leader'],
  },
]

export default routes
