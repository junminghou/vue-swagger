import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Textarea from '@/components/textarea'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/Text',
      name: 'Text',
      component: Textarea
    }
  ]
})
