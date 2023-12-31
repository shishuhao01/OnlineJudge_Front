<template>
  <div id="AllTitle">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="title" label="名称" style="min-width: 240px">
        <a-input v-model="searchParams.title" placeholder="请输入名称" />
      </a-form-item>
      <a-form-item field="tags" label="标签" style="min-width: 240px">
        <a-input-tag v-model="searchParams.tags" placeholder="请输入标签" />
      </a-form-item>
      <a-form-item>
        <a-button @click="doSubmit" status="warning">搜索</a-button>
      </a-form-item>
    </a-form>

    <a-table
      :columns="columns"
      :data="data"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        pageNum: searchParams.pageNum,
        total: total,
      }"
      @page-change="pageChange"
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
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doQuestion(record)">做题</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import {
  QuestionControllerService,
  QuestionQueryRequest,
  QuestionAddRequest,
} from "../../../generated";
import { onMounted, reactive, ref, watchEffect } from "vue";
import { da } from "element-plus/es/locale";
import { StoreOptions, useStore } from "vuex";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import moment from "moment";

onMounted(() => {
  getAllQuestion();
});
const total = ref();
const data = ref([]);

const searchParams = ref<QuestionQueryRequest>({
  pageNum: 1,
  pageSize: 10,
  title: "",
  tags: [],
});

const router = useRouter();
const store = useStore();
const user = store.state.user.loginUser;

const pageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    pageNum: page,
  };
};

const getAllQuestion = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
  );
  if (res.code == 0) {
    data.value = res.data.records;
    total.value = parseInt(res.data.total);
  } else {
    Message.error("查询失败");
  }
};
watchEffect(() => {
  getAllQuestion();
});

const doSubmit = () => {
  searchParams.value = {
    ...searchParams.value,
    pageNum: 1,
  };
};

const doQuestion = (question: QuestionQueryRequest) => {
  if (user.userName == "未登录") {
    Message.error("您还未登录，请先登录");
    router.push({
      path: `/user/login`,
    });
  } else {
    router.push({
      path: `/question/view/${question.id}`,
    });
  }
};

const columns = [
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "通过率",
    slotName: "acceptedRate",
  },

  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];
</script>

<style scoped>
#AllTitle {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
