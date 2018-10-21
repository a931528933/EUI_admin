import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import LeftNav from './components/LeftNav.vue';
import UserList from './components/UserList.vue';
import FeedBack from './components/FeedBack.vue';
import Area from './components/Area.vue';
import AddRace from './components/AddRace.vue';
import RaceInfo from './components/RaceInfo.vue';
import CheckRace from './components/CheckRace.vue';
const routes = [
  { path: '/index', component: LeftNav },
  { path: '/index', component: LeftNav },
  { path:'/userlist',component: UserList },
  { path:'/feedback',component: FeedBack },
  { path:'/area',component: Area },
  { path:'/addrace',component: AddRace },
  { path:'/raceinfo',component: RaceInfo },
  { path:'/checkrace',component: CheckRace },
];
const router = new VueRouter({
  routes 
});
export default router;