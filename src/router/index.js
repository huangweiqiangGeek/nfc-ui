import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login';
import Main from '@/views/Main';
import Page404 from '@/views/404';
import User from '@/views/user';
import UserInfo from '@/views/user/info';
import Role from '@/views/role';
import RoleInfo from '@/views/role/info';
import Shop from '@/views/shop';
import ShopAdd from '@/views/shop/add';
import ShopEdit from '@/views/shop/edit';
import Tag from '@/views/tag';
import TagInfo from '@/views/tag/info';
import Dict from '@/views/dict';
import DictInfo from '@/views/dict/info';

Vue.use(Router);

export const white = ['/login', '/500', '/403', '/404'];
export default new Router({
  // mode: 'history',
  routes: [
    {path: '/login', name: 'Login', component: Login},
    {path: '/404', name: '404', component: Page404},
    {
      path: '/', name: 'Main', component: Main, children: [

      {path: '/dict', name: '字典管理', component: Dict},
      {path: '/dict/add', name: '添加', component: DictInfo},
      {path: '/dict/edit/:id', name: '修改', component: DictInfo},

      {path: '/tag', name: '标签管理', component: Tag},
      {path: '/tag/add', name: '添加', component: TagInfo},
      {path: '/tag/edit/:id', name: '修改', component: TagInfo},


      {path: '/shop', name: '商户管理', component: Shop},
      {path: '/shop/add', name: '添加', component: ShopAdd},
      {path: '/shop/edit/:id', name: '修改', component: ShopEdit},


      {path: '/manager/user', name: '管理员', component: User},
      {path: '/manager/user/add', name: '添加', component: UserInfo},
      {path: '/manager/user/edit/:id', name: '修改', component: UserInfo},
      {path: '/manager/role', name: '角色', component: Role},
      {path: '/manager/role/add', name: '添加', component: RoleInfo},
      {path: '/manager/role/edit/:id', name: '修改', component: RoleInfo},

    ]
    }
  ]
});

