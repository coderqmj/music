import React from 'react'

import { Redirect } from 'react-router-dom'

import Discover from '@/pages/discover'
import Friend from '@/pages/friend'
import Mine from '@/pages/mine'
import Recommend from '../pages/discover/c-pages/recommend'
import Ranking from '@/pages/discover/c-pages/ranking'
import Songs from '@/pages/discover/c-pages/songs'
import Djradio from '@/pages/discover/c-pages/djradio'
import Artist from '@/pages/discover/c-pages/artist'
import Album from '@/pages/discover/c-pages/album'
import Palyer from '../pages/palyer'

const routes =[
  { path:"/", exact:true, render: () =>(  <Redirect  to="/discover" />  ) },
  {
    path: '/discover', 
    component: Discover,
    routes: [
      {
        path: "/discover",
        exact: true,
        render: () => (
          <Redirect to="/discover/recommend" />
        )
      },
      {
        path: "/discover/recommend",
        component: Recommend
      },
      {
        path: "/discover/ranking",
        component: Ranking
      },
      {
        path: "/discover/songs",
        component: Songs
      },
      {
        path: "/discover/djradio",
        component: Djradio
      },
      {
        path: "/discover/artist",
        component: Artist
      },
      {
        path: "/discover/album",
        component: Album
      },
      {
        path: '/discover/player',
        component: Palyer
      }
    ]
  },
  { path: '/friend', component: Friend },
  { path: '/mine', component: Mine },
]

export default routes;