<template>
  <div id="AllTitle">
    <div style="margin-left: 1000px">得分：{{ score }}</div>
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
          <a-button type="primary" @click="doQuestion(record)">做题</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import { Message } from "@arco-design/web-vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import {
  CompetitionControllerService,
  CompetitionDeleteRequest,
} from "../../../generated";
import moment from "moment";

const route = useRoute();
const questionData = ref();
const score = ref(0);

const competitionId = route.params.competitionId;

const getOnlineCompetitionMsg = async () => {
  const res = await CompetitionControllerService.getCompetitionByUsingPost(
    competitionId as any
  );
  if (res.code == 0) {
    Message.success("欢迎参加比赛");
    questionData.value = res.data.questionVOList;
    console.log(questionData.value);
  } else {
    Message.error("系统出现问题了");
  }
};

onMounted(() => {
  getOnlineCompetitionMsg();
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
