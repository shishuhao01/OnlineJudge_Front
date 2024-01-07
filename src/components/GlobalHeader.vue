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
            <div class="title">OJ系统</div>
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
    <a-row flex="150px" style="display: inline">
      <a-col
        v-if="userRole == ACCESS_ENUM.ADMIN"
        style="color: block; margin-right: 50px"
      >
        管理员：{{ userName ?? "未登录" }}
        <a-button type="text" status="danger" @click="layout">注销</a-button>
        <a-button type="text" status="success" @click="registerByFace"
          >刷脸注册</a-button
        >
      </a-col>
      <a-col
        v-else-if="userRole == ACCESS_ENUM.USER"
        style="color: block; margin-right: 50px"
      >
        {{ userName ?? "未登录" }}
        <a-button type="text" status="danger" @click="layout">注销</a-button>
        <a-button type="primary" status="success" @click="registerByFace"
          >刷脸注册</a-button
        >
      </a-col>
      <a-col v-else style="color: block; margin-right: 50px">
        未登录
        <a-button status="warning" @click="login" style="margin-left: 5px"
          >登录</a-button
        >
      </a-col>
    </a-row>
    <video ref="video" autoplay style="margin-left:2000px,max-width:100px;max-height:100px"></video>

  </a-row>

</template>

<script setup lang="ts">
import { routes } from "@/router/router";
import { useRoute, useRouter } from "vue-router";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { UserControllerService } from "../../generated";
import { Message, Notification } from "@arco-design/web-vue";
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

const login = () => {
  router.push("/user/login");
};

const layout = async () => {
  const res = await UserControllerService.userLogoutUsingPost();
  if (res.code == 0) {
    await store.dispatch("user/UserLayout");
    router.push("/");
  }
};

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

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

let stream: MediaStream | null = null;
const video = ref<HTMLVideoElement | null>(null);

const registerByFace = async () => {
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
      const res = await UserControllerService.userRegisterByFace(file);
      if (res.code == 0) {
        Notification.info({
          content: "登录成功",
        });
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
#GlobalHeader {
}
</style>
