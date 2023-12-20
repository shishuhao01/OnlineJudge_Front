<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header
        class="header"
        v-if="current == null"
      >
        <img
          src="@/img/a.jpeg"
          class="logo"
          style="position: relative; margin-left: 750px"
        />
      </a-layout-header>

      <a-layout-content class="content">
        <div>
          <template v-if="current != null && userView">
            你好啊{{ current }}
          </template>
        </div>
        <router-view />
      </a-layout-content>

      <a-layout-footer class="footer">

      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup>
import UserLogin from "@/views/User/UserLogin.vue";
import UserRegister from "@/views/User/UserRegister.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import ACCESS_ENUM from "@/access/accessEnum";

const route = useRoute();
const router = useRouter();
const loginUser = useStore();
const loginView = route.path.includes("/login");
const registerView = route.path.includes("/register");
const userView = route.path.endsWith("/user");

const current = computed(() => {
  if (loginUser.state.user.loginUser.userRole == ACCESS_ENUM.NOT_LOGIN) {
    if (route.path.startsWith("/user/register")) {
      router.push("/user/register");
    } else {
      router.push("/user/login");
    }
    return null;
  }
  return loginUser.state.user.loginUser.userName;
});
</script>

<style>
#userLayout {
  background: url("https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png")
    0% 0% / 100% 100%;
}

#userLayout.content.title {
  float: left;
  margin-top: 10px;
  font-size: 20px;
}
.logo {
  width: 100px;
  height: 150px;
}
#userLayout .header {
  margin-bottom: 16px;
  box-shadow: #eee 1px 1px 5px;
}
#userLayout .content {
  margin-bottom: 16px;
  padding: 20px;
}
#userLayout .footer {
  background: #efefef;
  padding: 16px;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  text-align: center;
}
#user {
  margin-right: 20px;
}
</style>
