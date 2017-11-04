import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Kanban from '@/components/Kanban'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/:kanban_name',
      name: 'Kanban',
      component: Kanban,
      props: true
    }
  ]
})
