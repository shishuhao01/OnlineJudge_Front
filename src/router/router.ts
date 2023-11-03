import ManageView from "@/views/question/ManageView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import ACCESS_ENUM from "../access/accessEnum";
import HomeView from "@/views/HomeView.vue";
import Titles from "@/views/Titles.vue";
import SubmitMsg from "@/views/SubmitMsg.vue";
import UserLayout from "@/BasicLayouts/UserLayout.vue";
import UserLogin from "@/views/User/UserLogin.vue";
import UserRegister from "@/views/User/UserRegister.vue";
import AddQuestion from "@/views/question/AddQuestionView.vue"

export const routes = [


   // 仅管理员可见
 {
  path: "/question/add",
  name: "创建题目",
  component: AddQuestion,
  meta: {
    access: ACCESS_ENUM.ADMIN,
  },
}, 

{
  path: "/admin",
  name: "题目管理",
  component: ManageView,
  meta: {
    access: ACCESS_ENUM.ADMIN,
  },
},


  //不需要用户登录
  {
    path: "/",
    name: "首页",
    component: HomeView,
    meta: {
      access: ACCESS_ENUM.NOT_LOGIN,
    },
  },
  {
    path: "/Titles",
    name: "题目信息",
    component: Titles,
    meta: {
      access: ACCESS_ENUM.NOT_LOGIN,
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
  {
    path: "/question/update",
    component: AddQuestion,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  }, 
];

export default routes;
