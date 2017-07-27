import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Textarea from '@/components/textarea'
import Jsonview from '@/components/jsonview'
import Modelview from '@/components/modelview'

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
    },
    {
      path: '/jsonview',
      name: 'jsonview',
      component: Jsonview
    },
    {
      path: '/modelview',
      name: 'modelview',
      component: Modelview
    }
  ]
})
