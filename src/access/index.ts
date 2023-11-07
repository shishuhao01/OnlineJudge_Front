import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "../access/accessEnum";

//全局权限鉴定
router.beforeEach(async (to, from, next) => {
  let loginUser = store.state.loginUser;
  if (to.fullPath.includes('/user/login') || to.fullPath.includes('/user/register')) {
    next();
  }
  if (!loginUser || !loginUser.userRole) {
    await store.dispatch("user/getLoginUser");
    if (store.state.user.loginUser !== null) {
      loginUser = store.state.user.loginUser;
    }
  }
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  if (loginUser.userRole == ACCESS_ENUM.ADMIN) {
    next();
    return;
  }
  if (loginUser.userRole == ACCESS_ENUM.USER) {
    if (needAccess == ACCESS_ENUM.ADMIN) {
      next("/NoAuthView");
      return;
    }
    next();
  }
  next();
});
