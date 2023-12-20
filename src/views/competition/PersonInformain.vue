<template>
  <div>
    <a-form :model="form" label-width="80px">
      <a-form-item field="userName" label="姓名" feedback>
        <a-input v-model="form.userName" class="short-input"></a-input>
      </a-form-item>

      <a-form-item label="性别">
        <a-radio-group>
          <a-radio label="男" value="男">男</a-radio>
          <a-radio label="女" value="女">女</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="所在城市">
        <a-input class="short-input1"></a-input>
      </a-form-item>
      <a-form-item label="所在大学">
        <a-input class="short-input2"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="submitForm">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import user from "@/store/user";
import { Message } from "@arco-design/web-vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import {
  UserCompetitionRecordService,
  UserCompetitionRecordAddRequest,
} from "../../../generated";

const router = useRoute();
const userId = router.query?.userId;
const competitionId = router.query?.competitionId;

const submitForm = async () => {
  form.value.userId = userId as string;
  form.value.competitionId = competitionId as string;

  const res =
    await UserCompetitionRecordService.addUserCompetitionRecoedUsingPost(
      form.value
    );
  if (res.code == 0) {
    Message.success("报名成功");
  } else {
    Message.error("报名失败");
  }
};

let form = ref({
  userName: "",
  userId: "",
  competitionId: "",
} as UserCompetitionRecordAddRequest);
</script>

<style scoped>
.short-input {
  max-width: 200px;
}
.short-input1 {
  max-width: 200px;
}
.short-input2 {
  max-width: 200px;
}
</style>
