import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css';
import router, {white} from './router';
import store from './store';
import $http from './axios';
import VueAxios from 'vue-axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import VueParticles from 'vue-particles';

Vue.config.productionTip = false;
Vue.use(ElementUI, {size: 'mini'});
Vue.use(VueAxios, $http);
Vue.use(VueParticles);

let title = 'NFC-Sys-Admin';
window.document.title = title;

/* 路由前处理 */
router.beforeEach((to, from, next) => {
  NProgress.start();
  // 滚动条置顶
  document.body.scrollTop = 0;
  if (white.indexOf(to.fullPath) > -1) {
    return next();
  }
  console.log("white", white);
  console.log("to.fullPath", to.fullPath);
  if (store.getters.user) {
    return next();
  } else {
    $http.get('/currentUser').then(res => {
      console.log(res);
      store.commit('SET_USER', res);
      let routes = store.getters.routes;
      //注入时拼接404处理路由
      router.addRoutes(routes.concat([{
        path: '*',
        redirect: '/404'
      }]));
      next({...to});
    });
  }
});

router.afterEach(transition => {
  NProgress.done();
});

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
