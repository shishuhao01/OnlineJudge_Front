<template>
  <a-form :model="searchParams" layout="inline">
    <a-form-item field="title" label="标题" style="min-width: 240px">
      <a-input v-model="searchParams.title" placeholder="请输入标题" />
    </a-form-item>
    <a-form-item field="language" label="语言" style="min-width: 240px">
      <a-input v-model="searchParams.language" placeholder="请输入语言" />
    </a-form-item>
    <a-form-item>
      <a-button @click="doSubmit" status="success">搜索</a-button>
    </a-form-item>
  </a-form>

  <a-table
    :columns="columns"
    :data="data"
    :pagination="{
      showTotal: true,
      pageSize: searchParams.pageSize,
      pageNum: searchParams.pageNum,
      defaultPageSize: [10, 20, 30, 40],
      total: total,
    }"
    @page-change="pageChange"
  >
    <template #status="{ record }">
      <a-space v-if="record.status == 2" style="color: #00FF00"> 完成 </a-space>
      <a-space v-else-if="record.status == 1" style="color: #FFFF66">
        判题中
      </a-space>
      <a-space v-else-if="record.status == 0" style="color: #CCFFFF">
        等待中
      </a-space>
      <a-space v-else-if="record.status == 3" style="color: #FF0000">
        判题失败
      </a-space>
    </template>

    <template #judgeInfo="{ record }">
      <a-space v-if="record.judgeInfo.message == '答案错误'" style="color: #FF0000">
        {{ record.judgeInfo.message }}
      </a-space>
      <a-space
        v-else-if="record.judgeInfo.message == '成功'"
        style="color: #00FF00"
      >
        {{ record.judgeInfo.message }}
      </a-space>

      <a-space v-if="record.judgeInfo.message == '内存溢出'" style="color: #0066FF">
        {{ record.judgeInfo.message }}
      </a-space>
    </template>

    <template #updateTime="{ record }">
      <a-space> {{ moment(record.updateTime).format("YYYY-MM-DD  HH:MM:SS") }} </a-space>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { onMounted, ref, watchEffect } from "vue";
import moment from "moment";
import {
  QuestionControllerService,
  QuestionSubmitQueryRequest,
} from "../../../generated";
import { Message } from "@arco-design/web-vue";

const store = useStore();
const data = ref([]);
const user = store.state.user.loginUser;
const total = ref();

const searchParams = ref<QuestionSubmitQueryRequest>({
  pageNum: 1,
  pageSize: 5,
  language: "",
  title:"",
});

const pageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    pageNum: page,
  };
};

const getAllQuestionSubmit = async () => {
  if (user.userRole === "admin") {
    const res =
      await QuestionControllerService.listQuestionSubmitByPageUsingPostAdmin(
        searchParams.value
      );
    if (res.code == 0) {
      data.value = res.data.records;
      total.value = parseInt(res.data.total);
    } else {
      Message.error("查询失败");
    }
  } else {
    const res =
      await QuestionControllerService.listQuestionSubmitByPageUsingPostUser(
        searchParams.value
      );
    if (res.code == 0) {
      data.value = res.data.records;
      total.value = parseInt(res.data.total);
      console.log(data.value);
    } else {
      Message.error("查询失败");
    }
  }
};

const doSubmit = () => {
  searchParams.value = {
    ...searchParams.value,
    pageNum: 1,
  };
};

onMounted(() => {
  getAllQuestionSubmit();
});

watchEffect(() => {
  getAllQuestionSubmit();
});

const columns = [
  {
    title: "提交id",
    dataIndex: "id",
  },
  {
    title: "编程语言",
    dataIndex: "language",
  },
    {
    title: "提交用户姓名",
    dataIndex: "userVO.userName",
  },
  {
    title: "提交用户Id",
    dataIndex: "userVO.id",
  },  
  {
    title: "标题",
    dataIndex: "questionVO.title",
  },
  {
    title: "判题结果",
    slotName: "judgeInfo",
  },
  {
    title: "判题状态",
    slotName: "status",
  },
  {
    title: "提交时间",
    slotName: "updateTime",
  },
];
</script>
