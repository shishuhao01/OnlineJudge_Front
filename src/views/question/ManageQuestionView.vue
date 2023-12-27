<template>
  <a-table
    :ref="tableRef"
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
    <template #tags="{ record }">
      <template v-for="(tag, index) of JSON.parse(record.tags)" :key="index">
        <a-tag v-if="tag == '中等'" color="orange">{{ tag }} </a-tag>
        <a-tag v-else-if="tag == '困难'" color="red">{{ tag }} </a-tag>
        <a-tag v-else-if="tag == '简单'" color="blue">{{ tag }} </a-tag>
        <a-tag v-else color="green">{{ tag }} </a-tag>
      </template>
    </template>

    <template #createTime="{ record }">
      <a-space> {{ moment(record.createTime).format("YYYY-MM-DD") }} </a-space>
    </template>
    <template #updateTime="{ record }">
      <a-space> {{ moment(record.updateTime).format("YYYY-MM-DD") }} </a-space>
    </template>
    <template #optional="{ record }">
      <a-space>
        <a-button type="primary" @click="updateQuestion(record)">修改</a-button>

        <a-button status="danger" @click="deleteQuestion(record)"
          >删除</a-button
        >
      </a-space>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import {
  QuestionControllerService,
  QuestionQueryRequest,
  QuestionAddRequest,
  DeleteRequest,
} from "../../../generated";

import { onMounted, reactive, ref, watchEffect } from "vue";
import { Page_Question_, Question } from "../../../generated";
import { StoreOptions } from "vuex";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import moment from "moment";

onMounted(() => {
  getAllQuestion();
});

const searchParams = ref({
  pageNum: 1,
  pageSize: 5,
});
const pageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    pageNum: page,
  };
};

const tableRef = ref();
const total = ref();
const data = ref([]);
const query = ref("") as QuestionQueryRequest;
const router = useRouter();
const tags = ref();

const getAllQuestion = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
    query
  );
  if (res.code == 0) {
    data.value = res.data.records;
    total.value = parseInt(res.data.total);
  } else {
    Message.error("查询失败");
  }
};

const deleteQuestion = async (question: DeleteRequest) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost(question);
  if (res.code == 0) {
    Message.success("删除成功");
    getAllQuestion();
  } else {
    Message.error(res.message);
  }
};

const updateQuestion = (question: Question) => {
  router.push({
    path: "/question/update",
    query: {
      id: question.id,
    },
  });
};

const columns = [
  // {
  //   title: "id",
  //   dataIndex: "id",
  // },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "描述",
    dataIndex: "content",
  },
  // {
  //   title: "判题示例",
  //   dataIndex: "judgeCase",
  // },
  // {
  //   title: "判题配置",
  //   slotName: "judgeConfig",
  // },
  {
    title: "标签",
    slotName: "tags",
    width: 220,
  },
  // {
  //   title: "答案",
  //   dataIndex: "answer",
  // },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
  },
  {
    title: "创建用户Id",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    title: "修改时间",
    slotName: "updateTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];
</script>
