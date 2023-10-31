import AdminView from "../views/AdminView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import ACCESS_ENUM from "../access/accessEnum";
import HomeView from "@/views/HomeView.vue";
import Titles from "@/views/Titles.vue";
import SubmitMsg from "@/views/SubmitMsg.vue";
import UserLayout from "@/BasicLayouts/UserLayout.vue";
import UserLogin from "@/views/User/UserLogin.vue";
import UserRegister from "@/views/User/UserRegister.vue";

export const routes = [
  //不需要用户登录
  {
    path: "/",
    name: "首页",
    component: HomeView,
  },
  {
    path: "/Titles",
    name: "题目信息",
    component: Titles,
  },

 // 仅管理员可见
 {
  path: "/admin",
  name: "管理员可见",
  component: AdminView,
  meta: {
    access: ACCESS_ENUM.ADMIN,
  },
},

  //需要用户登录
  {
    path: "/SubmitMsg",
    name: "提交记录",
    component: SubmitMsg,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/user",
    name: "关于我的",
    component: UserLayout,
    children: [
      {
        path: "login",
        name: "用户登录",
        component: UserLogin,
      },
      {
        path: "register",
        name: "用户注册",
        component: UserRegister,
      },
    ],
  },


  // 无权限界面，只有没有权限的时候会跳转
  {
    path: "/NoAuthView",
    name: "无权限",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  },
];

export default routes;
