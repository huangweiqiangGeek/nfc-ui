import Vue from 'vue';
import Vuex from 'vuex';
import Main from '@/views/Main.vue';
import fullRoutes from '@/router/fullRoutes.js';

Vue.use(Vuex);

// 应用初始状态
const state = {
  // 用户信息
  user: null,
  menus: null,
};

const getters = {
  user(state) {
    return state.user;
  },
  menus(state) {
    return state.menus;
  },
  routes(state) {
    let menus = state.menus;
    return menus;
  }
};

// mutations
const mutations = {
  SET_USER(state, user) {
    state.user = user;
    state.menus = user.menus;
  }
};

function toRoutes(menus) {
  if (!menus) {
    return [];
  }
  let routes = [];
  menus.forEach((item) => {
    let route = {};
    if (item.type === 0) {
      route.path = item.path;
      route.redirect = item.redirect;
      route.name = item.name;
      route.icon = item.icon;
      route.component = Main;
      if (item.children) {
        route.children = toRoutes(item.children);
      }
    } else if (item.type === 1) {
      route.path = item.path;
      route.name = item.name;
      route.component = resolve => {
        require(['@/views' + (item.page ? item.page : item.path)], resolve);
      };
      if (item.children) {
        route.children = [];
        item.children.forEach((child) => {
          let r = {};
          if (child.type === 1) {
            r.path = child.path;
            r.name = child.name;
            r.component = resolve => {
              require(['@/views' + (child.page ? child.page : child.path)], resolve);
            };
          }
          route.children.push(r);
        });
      }
    } else {
      return;
    }
    routes.push(route);
  });
  return routes;
}

const actions = {
  test({commit}) {
    return new Promise(resolve => {
      resolve({});
    });
  }
};

// 创建 store 实例
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: process.env.STORE_STRICT
});
