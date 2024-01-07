// initial state
import ACCESS_ENUM from "@/access/accessEnum";
import { StoreOptions } from "vuex";
import { UserControllerService } from "../../generated";
export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
    },
  }),
  actions: {
    async getLoginUser({ commit, state }, payload) {
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESS_ENUM.NOT_LOGIN,
        });
      }
    },
    async getLoginUserByFace({ commit, state }, payload) {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESS_ENUM.ADMIN,
          userName: "张三",
        });
    },
    async UserLayout({ commit, state }, payload) {
      commit("updateUser", {
        ...state.loginUser,
        userName: "未登录",
        userRole: ACCESS_ENUM.NOT_LOGIN,
      });
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
