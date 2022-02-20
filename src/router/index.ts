import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'dashboard',
    component: HomeView,
  },
];

export const Router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

