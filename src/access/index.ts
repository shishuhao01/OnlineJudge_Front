import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "../access/accessEnum";

//全局权限鉴定
router.beforeEach(async (to, from, next) => {
  const loginUser = store.state.user.loginUser; 
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  if (loginUser == ACCESS_ENUM.ADMIN) {
    next();
    return;
  }
  if (loginUser == ACCESS_ENUM.USER) {
    if (needAccess == ACCESS_ENUM.ADMIN) {
      next("/NoAuthView");
      return;
    }
    next();
  }
next();


});
