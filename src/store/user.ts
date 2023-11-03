// initial state
import ACCESS_ENUM from "@/access/accessEnum";
import { StoreOptions } from "vuex";
export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
      role: ACCESS_ENUM.ADMIN,
    },
  }),
  actions: {
    async getLoginUser({ commit, state }, payload) {
     commit("updateUser",{
      ...state.loginUser,
      userName: payload.userName,
      role: payload.role,
     })
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
    
  },
} as StoreOptions<any>;
