import Vue from 'vue'
import VueRouter from 'vue-router'
import MyMain from '../MyMain.vue'
import home from '../views/home/index.vue'
import list from '../views/list/index.vue'
import add from '../views/add/index.vue'
import category from '../views/category/index.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MyMain',
    component: MyMain,
    children: [
      {
        path: '/',
        name: 'home',
        component:home
      },
      {
        path: '/list',
        name: 'list',
        component: list
      },
      {
        path: '/add',
        name: 'add',
        component: add
      },
      {
        path: '/category',
        name: 'category',
        component: category
      }

    ]
  }


]

const router = new VueRouter({
  routes
})

export default router
