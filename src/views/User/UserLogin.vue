<template>
  <h2 style="margin-bottom: 16px; text-align: center">欢迎登录</h2>
  <div id="userLogin">
    <a-form
      :model="form"
      @submit="handleSubmit"
      auto-label-width
      style="max-width: 480px; margin: 0 auto; height: 100px"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入用户名" />
      </a-form-item>

      <a-form-item field="userPassword" tooltip="密码不少于8位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit"> 登录</a-button
        ><router-link to="/user/register" style="margin-left: 15px">
          没有账户，注册一个？</router-link
        >
        <video ref="video" autoplay style="display: none"></video>
        <a-button
          type="primary"
          status="warning"
          @click="login"
          style="margin-left: 40px"
          >刷脸登录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { UserControllerService, UserLoginRequest } from "../../../generated";
import { reactive, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { Message, Notification } from "@arco-design/web-vue";
import ACCESS_ENUM from "@/access/accessEnum";
import user from "@/store/user";

const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const route = useRoute();
const router = useRouter();
const store = useStore();

const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code == 0) {
    Notification.info({
      content: "登录成功",
    });
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/",
    });
    //登录后不能返回登录页
  } else {
    Notification.info({
      content: res.data,
    });
  }
};

let stream: MediaStream | null = null;
const video = ref<HTMLVideoElement | null>(null);

const login = async () => {
  if (navigator.mediaDevices.getUserMedia) {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (video.value) {
        video.value.srcObject = stream;
        video.value.style.display = "block";
        await new Promise((r) => setTimeout(r, 3000)); // 等待3秒以确保视频流已经开始
        capture();
        if (stream) {
          let tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        }
        video.value.style.display = "none";
      }
    } catch (err) {
      console.error("An error occurred: " + err);
    }
  }
};

const capture = async () => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (video.value && context) {
    canvas.width = video.value.videoWidth;
    canvas.height = video.value.videoHeight;
    context.drawImage(video.value, 0, 0);
    canvas.toBlob(async (blob) => {
      const file = new File([blob as Blob], "face.png", { type: "image/png" });

      const res = await UserControllerService.userLoginByFace(file);

      if (res.code == 0) {
        Notification.info({
          content: "登录成功",
        });
        store.dispatch("user/getLoginUser");

        router.push({
          path: "/",
        });
        //登录后不能返回登录页
      } else {
        Notification.info({
          content: res.message,
        });
      }
    });
  }
};
</script>

<style></style>
