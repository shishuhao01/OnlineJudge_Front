<template>
  <a-row id="GlobalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-p">
            <img class="logo" src="../img/a.jpeg" />
            <div class="title">OJ</div>
          </div>
        </a-menu-item>
        <a-menu-item
          v-for="item in visiableMune"
          :key="item.path"
          id="title-font"
        >
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div v-if="userRole == ACCESS_ENUM.ADMIN">
        管理员：{{ userName ?? "未登录" }}
      </div>
      <div v-else>
        {{ userName ?? "未登录" }}
      </div>
    </a-col>
  </a-row>
</template>

<script setup>
import { routes } from "@/router/router";
import { useRoute, useRouter } from "vue-router";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/CheackAccess";
import ACCESS_ENUM from "@/access/accessEnum";

const router = useRouter();
const store = useStore();

const userName = computed(() => {
  return store.state.user.loginUser.userName;
});
const userRole = computed(() => {
  return store.state.user.loginUser.userRole;
});

//默认的是主页
const selectKeys = ref(["/titles"]);

//过滤routes
const visiableMune = computed(() => {
  const loginUser = store.state.user.loginUser;
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    if (!checkAccess(loginUser, item?.meta?.access)) {
      return false;
    }
    return true;
  });
});

// 路由跳转后， 更新菜单的菜单项
router.afterEach((to, from, failure) => {
  selectKeys.value = [to.path];
});

const doMenuClick = (key) => {
  router.push({
    path: key,
  });
};

// 用来测试登录用户的正确性
// setTimeout(() => {
//   store.dispatch("user/getLoginUser", {
//     userName: "呆鱼",
//     role: ACCESS_ENUM.ADMIN,
//   });
// }, 3000);
// setTimeout(() => {
//   store.dispatch("user/getLoginUser", {
//     userName: "未登录",
//     role: ACCESS_ENUM.USER,
//   });
// }, 6000);
</script>

<style>
.title-p {
  display: flex;
  align-items: center;
}
.logo {
  height: 100px;
  width: 150px;
}
.title {
  margin-left: 16px;
  color: black;
  font-size: 20px;
}
</style>
