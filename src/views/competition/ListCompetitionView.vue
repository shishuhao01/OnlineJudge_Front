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
        min-height: 600px;
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

      <div style="margin-top: 5px">
        <span style="margin-bottom: 5px">
          比赛组别：{{ record.languageType }} 组 <br
        /></span>
        <span style="margin-bottom: 5px">
          比赛日期：{{ record.date }}<br
        /></span>

        <span style="margin-bottom: 5px">
          比赛开始时间：{{ record.startTime }}<br
        /></span>
        <span style="margin-bottom: 5px">
          比赛结束时间：{{ record.endTime }}<br
        /></span>
      </div>

      <div
        v-if="
          currentDate === record.date &&
          currentTime < record.endTime &&
          currentTime >= record.startTime
        "
        style="text-align: center; margin-top: 7px"
      >
        <a-button type="primary" disabled>比赛正在进行</a-button>
      </div>

      <div
        v-else-if="currentDate === record.date && currentTime >= record.endTime"
        style="text-align: center; margin-top: 7px"
      >
        <a-button type="primary" disabled>比赛已经结束</a-button>
      </div>
      <div
        v-else-if="currentDate > record.date"
        style="text-align: center; margin-top: 7px"
      >
        <a-button type="primary" disabled>比赛已经结束</a-button>
      </div>

      <div v-else style="text-align: center; margin-top: 7px">
        <a-button type="primary" @click="doApplication(record.id)"
          >报名</a-button
        >
      </div>
    </el-card>
  </el-space>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
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

const store = useStore();

const doApplication = (competitionId: string) => {
  const userId = store.state.user.loginUser.id;
  router.push({
    path: "/Profiles",
    query: {
      competitionId: competitionId,
      userId: userId,
    },
  });
};
</script>

<style></style>
