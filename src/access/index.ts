import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "../access/accessEnum";

//全局权限鉴定
router.beforeEach(async (to, from, next) => {
  const loginUser = store.state.user.loginUser; 
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  if (needAccess === ACCESS_ENUM.ADMIN) {
    if (loginUser.role == ACCESS_ENUM.ADMIN) {
      next();
      return;
    }else {
      next("/NoAuthView");
      return;
    }
  }
  if (needAccess === ACCESS_ENUM.USER) {
    if (loginUser.role === undefined) {
      next("/user");
      return;
    }
  }
  next();
});
