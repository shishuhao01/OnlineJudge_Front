<template>
  <h2 style="margin-bottom: 16px; text-align: center">欢迎注册</h2>
  <div id="userLogin">
    <a-form
      :model="form"
      @submit="handleSubmit"
      auto-label-width
      style="max-width: 480px; margin: 0 auto; height: 100px"
    >
      <a-form-item field="userAccount" tooltip="账号不少于4位" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>

      <a-form-item field="userName" label="用户名">
        <a-input v-model="form.userName" placeholder="请输入用户名" />
      </a-form-item>

      <a-form-item field="userPassword" tooltip="密码不少于8位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>

      <a-form-item
        field="checkPassword"
        tooltip="密码不少于8位"
        label="确认密码"
      >
        <a-input-password
          v-model="form.checkPassword"
          placeholder="再次输入密码"
        />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" @click="submit"> 注册</a-button>
         <a-button type="primary" status="success" @click="login" style="margin-left:10px">登录</a-button>
      </a-form-item>
      
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { UserControllerService, UserRegisterRequest } from "../../../generated";
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { Message, Notification } from "@arco-design/web-vue";
import ACCESS_ENUM from "@/access/accessEnum";
import user from "@/store/user";

const form = reactive({
  userAccount: "",
  userName: "",
  userPassword: "",
  checkPassword: "",
} as UserRegisterRequest);

const route = useRoute();
const router = useRouter();
const store = useStore();
const login = () => {
  router.push("/user/login");
}

const submit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form);
  if (res.code == 0) {
    const res = await UserControllerService.userLoginUsingPost(form);
    if (res.code == 0) {
      Notification.info({
        content: "注册成功",
      });
      await store.dispatch("user/getLoginUser");
      router.push({
        path: "/",
      });
      //登录后不能返回登录页
    } else {
      Notification.info({
        content: "注册失败",
      });
    }
  } else {
    Message.error("注册失败,注意格式和提示");
  }
};
</script>

<style></style>
