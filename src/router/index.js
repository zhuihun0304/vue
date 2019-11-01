import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import IndexOne from '@/components/view/IndexOne'
import First from '@/components/view/First'
import Second from '@/components/view/Second'
import FormRules from '@/components/view/FormRules'
import Tags from '@/components/view/Tags'
import SecondPrize from '@/components/view/SecondPrize'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/indexOne',
          name: 'IndexOne',
          component: IndexOne
        },
        {
          path: '/first',
          name: 'First',
          component: First
        },
        {
          path: '/second',
          name: 'Second',
          component: Second
        },
        {
          path: '/form',
          name: 'FormRules',
          component: FormRules
        },
        {
          path: '/tags',
          name: 'Tags',
          component: Tags
        },
        {
          path: '/secondPrize',
          name: 'SecondPrize',
          component: SecondPrize
        }
      ]
    }
  ]
})
