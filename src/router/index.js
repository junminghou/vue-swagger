import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Textarea from '@/components/textarea'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/Text',
      name: 'Text',
      component: Textarea
    }
  ]
})
