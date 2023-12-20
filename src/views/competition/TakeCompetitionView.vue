<template>
  <el-space wrap>
    <el-card
      v-for="(record, index) in data"
      :key="index"
      class="box-card"
      style="width: 250px; height: 400px"
    >
      <template #header>
        <div class="card-header" style="height: 200px">
          <span>{{ record.competitionTitle }}</span>
          <br />
          <span>{{ record.competitionContext }}</span>
        </div>
      </template>
      <div>
        比赛组别：{{ record.languageType }} 组<br />
        比赛日期：{{ record.date }}<br />

        比赛开始时间：{{ record.startTime }}<br />
        比赛结束时间：{{ record.endTime }}<br />
      </div>

      <div
        v-if="
          currentDate === record.date &&
          currentTime < record.endTime &&
          currentTime >= record.startTime
        "
        style="text-align: center; margin-top: 7px"
      >
        <a-button type="primary" @click="takeCompetition(record.id)"
          >参加比赛</a-button
        >
      </div>

      <div
        v-else-if="currentDate === record.date && currentTime >= record.endTime"
        style="text-align: center; margin-top: 7px"
      >
        <a-button type="primary" @click="doQuestion(record)">比赛结束</a-button>
      </div>

      <div
        v-else-if="
          currentDate === record.date && currentTime <= record.startTime
        "
        style="text-align: center; margin-top: 7px"
      >
        <a-button type="primary" @click="doQuestion(record)">马上开始</a-button>
      </div>

      <div
        v-else-if="currentDate < record.date"
        style="text-align: center; margin-top: 7px"
      >
        <h5 style="color: black; font-size: 15px; text-align: center">
          还未开始
        </h5>
      </div>

      <div
        v-else-if="currentDate > record.date"
        style="text-align: center; margin-top: 7px"
      >
        <a-button type="primary" @click="doQuestion(record)">查看排名</a-button>
      </div>
    </el-card>
  </el-space>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import {
  CompetitionControllerService,
  CompetitionQueryRequest,
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

const takeCompetition = (competitionId: string) => {
  router.push({
    path: `/competition/online/${competitionId}`,
  });
};
</script>

<style></style>
