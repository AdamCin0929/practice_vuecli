import { createRouter, createWebHistory } from 'vue-router'
import MovieView from '../views/MovieView.vue'
import TVseriesView from '../views/TVseriesView.vue'
import Trailers from '../views/Trailers.vue'

const routes = [
  {
    path: '/trailers/:movieid/:movietitle',
    name: 'trailers',
    component: Trailers
  },
  {
    path: '/',
    name: 'movie',
    component: MovieView
  },
  {
    path: '/tvseries',
    name: 'tvseries',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: TVseriesView
  },
  {

    path: '/stars',
    name: 'stars',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "setting" */ '../views/StarsView.vue')

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
