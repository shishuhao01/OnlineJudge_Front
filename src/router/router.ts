import ManageView from "@/views/question/ManageQuestionView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import ACCESS_ENUM from "../access/accessEnum";
import HomeView from "@/views/HomeView.vue";
import Titles from "@/views/question/ListQuestionView.vue";
import SubmitQuestion from "@/views/question/SubmitQuestionView.vue";
import UserLayout from "@/BasicLayouts/UserLayout.vue";
import UserLogin from "@/views/User/UserLogin.vue";
import UserRegister from "@/views/User/UserRegister.vue";
import AddQuestion from "@/views/question/AddQuestionView.vue";
import OnlineJudge from "@/views/question/OnlineQuestionView.vue";
import AddCompetition from "@/views/competition/AddCompetitionView.vue"
import TakeCompetition from "@/views/competition/TakeCompetitionView.vue";
import OnlineCompetition from "@/views/competition/OnlineCompetitionView.vue"
import ListCompetition from  "@/views/competition/ListCompetitionView.vue"
import ProsonInformation from "@/views/competition/PersonInformain.vue"

export const routes = [
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

  {
    path: "/question/view/:id",
    name: "在线做题",
    component: OnlineJudge,
    props: true,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },

  {
    path: "/Profiles",
    name: "个人信息填写",
    component: ProsonInformation,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  //需要用户登录
  {
    path: "/SubmitMsg",
    name: "提交记录",
    component: SubmitQuestion,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  // 仅管理员可见
  {
    path: "/competition/add",
    name: "添加比赛",
    component: AddCompetition,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/competition/Application",
    name: "比赛报名",
    component: ListCompetition,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/competition/participate",
    name: "参加比赛",
    component: TakeCompetition,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/competition/online/:competitionId",
    name: "在线比赛",
    component: OnlineCompetition,
    props: true,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
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
