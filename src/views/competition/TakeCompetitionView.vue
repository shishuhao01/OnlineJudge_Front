<template>
  <el-space wrap>
    <el-card
      v-for="(record, index) in data"
      :key="index"
      class="box-card"
      style="
        display: inline-block;
        max-width: 400px;
        margin-left: 100px;
        background-color: #f0f8ff;
      "
    >
      <template #header>
        <div class="card-header" style="display: inline-block">
          <span>标题： {{ record.competitionTitle }}</span>
          <br />
          <span>描述： {{ record.competitionContext }}</span>
          <a-image
            width="100%"
            height="100%"
            :src="'http://localhost:8101/api/image/' + record.imgUrl"
          />
        </div>
      </template>

      <div style="margin-top: 5 %">
        <span style="margin-top: 2%">
          比赛组别：{{ record.languageType }} 组 <br
        /></span>
        <span style="margin-top: 2%"> 比赛日期：{{ record.date }}<br /></span>

        <span style="margin-top: 2%">
          比赛开始时间：{{ record.startTime }}<br
        /></span>
        <span style="margin-top: 2%">
          比赛结束时间：{{ record.endTime }}<br
        /></span>
      </div>

      <div
        v-if="
          currentDate === record.date &&
          currentTime < record.endTime &&
          currentTime >= record.startTime
        "
        style="text-align: center; margin-top: 10%"
      >
        <a-button type="primary" @click="takeCompetition(record.id)"
          >参加比赛</a-button
        >
      </div>

      <div
        v-else-if="currentDate === record.date && currentTime >= record.endTime"
        style="text-align: center; margin-top: 5%"
      >
        <a-button type="primary" status="warning" @click="doQuestion(record)">查看排名</a-button>
      </div>

      <div
        v-else-if="
          currentDate === record.date && currentTime <= record.startTime
        "
        style="text-align: center; margin-top: 5%"
      >
        <a-button type="primary" @click="doQuestion(record)">马上开始</a-button>
      </div>

      <div
        v-else-if="currentDate < record.date"
        style="text-align: center; margin-top: 5%"
      >
        <h5 style="color: black; font-size: 15px; text-align: center">
          还未开始
        </h5>
      </div>

      <div
        v-else-if="currentDate > record.date"
        style="text-align: center; margin-top: 5%"
      >
        <a-button type="primary" status="warning" @click="doQuestion(record)"
          >查看排名</a-button
        >
      </div>
    </el-card>
  </el-space>
</template>

<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import {
  CompetitionControllerService,
  CompetitionQueryRequest,
  UserCompetitionRecordService,
} from "../../../generated";

const searchParams = ref<CompetitionQueryRequest>({
  pageNum: 1,
  pageSize: 10,
});

const date = ref(new Date());

//当前日期
const currentDate = computed(() => date.value.toISOString().split("T")[0]);
//当前时间
const currentTime = computed(() => date.value.toLocaleTimeString());

const data = ref({});

const router = useRouter();
const ListCompetitionByPage = async () => {
  const res = await CompetitionControllerService.listCompetitionByPageUsingPost(
    searchParams.value
  );
  if (res.code == 0) {
    data.value = res.data.records;
  }
};

onMounted(() => {
  ListCompetitionByPage();
});

const takeCompetition = async (competitionId: string) => {
  const res = await UserCompetitionRecordService.takeCompetition(competitionId);
  if (res.code == 0) {
    router.push({
      path: `/competition/online/${competitionId}`,
    });
  } else {
    Message.error("参加失败");
  }
};
</script>

<style></style>
