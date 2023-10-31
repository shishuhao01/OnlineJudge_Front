//公用的权限判断方法

import ACCESS_ENUM from "./accessEnum";

/**
 * 检查权限，（判断当前用户是否有权限进入某个页面）
 * @param {*} loginUser   用户的权限
 * @param {*} needAccess  需要的权限
 */
const checkAccess = (loginUser: any, needAccess: any) => {
  const loginUserAccess = loginUser?.role;
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }

  if (needAccess === ACCESS_ENUM.USER) {
    //只要登录就可以
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }

  if (needAccess === ACCESS_ENUM.ADMIN) {
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }
  return true;
};
export default checkAccess;
