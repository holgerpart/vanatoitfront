import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView";
import ShopView from "@/views/ShopView";
import UserView from "@/views/UserView";
import FoodInputView from "@/views/StockInputView";
import StockView from "@/views/StockView";
import OrdersView from "@/views/OrdersView";
import StockInputView from "@/views/StockInputView";
import StockUpdateView from "@/views/StockUpdateView";
import AdminView from "@/views/AdminView";
import OrderUpdateView from "@/views/OrderUpdateView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'homeRoute',
    component: HomeView
  },{
    path: '/admin',
    name: 'adminRoute',
    component: AdminView
  },
  {
    path: '/',
    name: 'loginRoute',
    component: LoginView
  },
  {
    path: '/register',
    name: 'registerRoute',
    component: RegisterView
  },
  {
    path: '/shop',
    name: 'shopRoute',
    component: ShopView
  },
  {
    path: '/user',
    name: 'userRoute',
    component: UserView
  },
  {
    path: '/stockinput',
    name: 'StockInputRoute',
    component: StockInputView
  },{
    path: '/stockupdate',
    name: 'StockUpdateRoute',
    component: StockUpdateView
  },
  {
    path: '/stock',
    name: 'stockRoute',
    component: StockView
  },
  {
    path: '/orders',
    name: 'ordersRoute',
    component: OrdersView
  },
  {
    path: '/orderupdate',
    name: 'orderUpdateRoute',
    component: OrderUpdateView
  },
  {
    path: '/about',
    name: 'aboutRoute',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
