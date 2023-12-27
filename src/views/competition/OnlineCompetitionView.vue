<template>
  <div id="AllTitle">
    <a-row>
      <a-col :flex="1">
        <div style="margin-left: 600px; font-size: 30px">
          倒计时: {{ countdown }}
        </div>
      </a-col>
      <a-col style="margin-left: 1200px; font-size: 30px"
        >得分 {{ score }}</a-col
      >
    </a-row>
    <a-table
      :columns="columns"
      :data="questionData"
      style="width: 1000px; margin: auto"
    >
      <template #tags="{ record }">
        <template v-for="(tag, index) of record.tags" :key="index">
          <a-tag v-if="tag == '中等'" color="orange">{{ tag }} </a-tag>
          <a-tag v-else-if="tag == '困难'" color="red">{{ tag }} </a-tag>
          <a-tag v-else-if="tag == '简单'" color="blue">{{ tag }} </a-tag>
          <a-tag v-else color="green">{{ tag }} </a-tag>
        </template>
      </template>
      <template #acceptedRate="{ record }">
        <a-space>
          {{
            `${
              record.submitNum
                ? (record.acceptedNum / record.submitNum) * 100
                  ? ((record.acceptedNum / record.submitNum) * 100).toFixed(2)
                  : "0"
                : "0"
            }%  (${record.acceptedNum}/${record.submitNum})`
          }}
        </a-space>
      </template>
      <template #createTime="{ record }">
        <a-space>
          {{ moment(record.createTime).format("YYYY-MM-DD") }}
        </a-space>
      </template>

      <template #judgeConfig="{ record }">
        <a-space> 时间限制:{{ record.judgeConfig.timeLimit }} ms </a-space>
        <a-space style="margin-left: 10px">
          内存限制:{{ record.judgeConfig.memoryLimit }} KB
        </a-space>
      </template>

      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="DoCmopetitionQuestion(record.id)"
            >做题</a-button
          >
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { Message } from "@arco-design/web-vue";
import { onMounted, reactive, ref, watch, onUnmounted, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  CompetitionControllerService,
  CompetitionDeleteRequest,
  UserCompetitionRecordService,
} from "../../../generated";
import moment from "moment";

const route = useRoute();
const questionData = ref();
const router = useRouter();

const competitionId = route.params.competitionId;
const userRecord = ref();
const score = ref();

const endTime = ref("");
const countdown = ref("");
 let timerId: number | null = null

const calculateCountdown = () => {
  const now = new Date();
  const end = new Date();
  end.setHours(parseInt(endTime.value.split(":")[0]));
  end.setMinutes(parseInt(endTime.value.split(":")[1]));
  end.setSeconds(parseInt(endTime.value.split(":")[2]));

  const diff = end.getTime() - now.getTime();

  if (diff <= 0) {
    countdown.value = "00:00:00";
    router.push("/competition/participate");
  } else {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdown.value = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
};

watch(
  () => endTime.value,
  () => {
    setInterval(calculateCountdown, 1000);
  }
);

timerId = window.setInterval(calculateCountdown, 1000)

    onUnmounted(() => {
      if (timerId) {
        window.clearInterval(timerId)
      }
    })



const getOnlineCompetitionMsg = async () => {
  const res = await CompetitionControllerService.getCompetitionByUsingPost(
    competitionId as any
  );
  if (res.code == 0) {
    Message.success("欢迎参加比赛");
    questionData.value = res.data.questionVOList;
    endTime.value = res.data.endTime;
  } else {
    Message.error("系统出现问题了");
  }
};

const getUserCompetitionRecord = async () => {
  const res = await UserCompetitionRecordService.getUserCompetitionRecord(
    competitionId as any
  );
  if (res.code == 0) {
    userRecord.value = res.data as any;
    score.value = res.data.score;
  } else {
  }
};

const DoCmopetitionQuestion = (questionId: any) => {
  router.push({
    path: `/competition/doQuestion`,
    query: {
      questionId: questionId,
      competitionId: competitionId,
      endTime: endTime.value,
    },
  });
};

onMounted(() => {
  getOnlineCompetitionMsg();
  getUserCompetitionRecord();
});

const columns = [
  {
    title: "标题",
    dataIndex: "title",
  },

  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "题目配置",
    slotName: "judgeConfig",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];
</script>

<style></style>
