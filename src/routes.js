import React from 'react'
import Publications from './views/posts/Posts'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Users = React.lazy(() => import('./views/users/Users'))
const Community = React.lazy(() => import('./views/community/Community'))
const Posts = React.lazy(() => import('./views/posts/Posts'))
const Profile = React.lazy(() => import('./views/profile/Profile'))

const routes = [
  { path: '/', exact: true, name: 'Inicio' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/users', name: 'Users', element: Users },
  { path: '/publications', name: 'Publications', element: Publications },
  { path: '/community', name: 'Community', element: Community },
  { path: '/posts', name: 'Posts', element: Posts },
  { path: '/profile', name: 'Profile', element: Profile },
]

export default routes
