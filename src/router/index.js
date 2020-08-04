import Discover from '@/pages/discover'
import Friend from '@/pages/friend'
import Mine from '@/pages/mine'

const routes = [
  { path: '/', exact: true, component: Discover },
  { path: '/friend', component: Friend },
  { path: '/mine', component: Mine },
]

export default routes;