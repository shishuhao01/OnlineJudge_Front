<template>
  <a-table
    :columns="columns"
    :data="data"
    :pagination="{
      showTotal: true,
      pageSize: searchParams.pageSize,
      current: searchParams.current,
      defaultPageSize: [10, 20, 30, 40],
      total,
    }"
  >
    <template #optional="{ record }">
      <a-space>
        <a-button type="primary" @click="updateQuestion(record)">修改</a-button>

        <a-popconfirm content="Are you sure you want to delete?" type="warning">
          <a-button status="danger" @click="deleteQuestion(record)"
            >删除</a-button
          >
        </a-popconfirm>
      </a-space>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import {
  QuestionControllerService,
  QuestionQueryRequest,
  QuestionAddRequest,
  QusetionDeleteRequest,
} from "../../../generated";
import { onMounted, reactive, ref } from "vue";
import { Page_Question_, Question } from "../../../generated";
import { da } from "element-plus/es/locale";
import { StoreOptions } from "vuex";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";

onMounted(() => {
  getAllQuestion();
});

const total = ref();
const searchParams = ref({
  current: 1,
  pageSize: 10,
});
const data = ref([]);
const query = ref("") as QuestionQueryRequest;
const getAllQuestion = async () => {
  const res = (await QuestionControllerService.listQuestionByPageUsingPost(
    query
  )) as any;
  if (res.code == 0) {
    data.value = res.data.records;
    total.value = res.data.total;
    console.log(data.value);
  } else {
    Message.error("查询失败");
  }
};

const deleteQuestion = async (question: QusetionDeleteRequest) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });
  if (res.code == 0) {
    Message.success("删除成功");
    getAllQuestion();
  } else {
    Message.error(res.message);
  }
};

const router = useRouter();
const updateQuestion = (question: Question) => {
  router.push({
    path: "/question/update",
    query: {
      id: question.id,
    },
  });
};

const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "描述",
    dataIndex: "content",
  },
  {
    title: "判题示例",
    dataIndex: "judgeCase",
  },
  {
    title: "判题配置",
    slotName: "judgeConfig",
  },
  {
    title: "题目标签",
    dataIndex: "tags",
  },
  {
    title: "答案",
    dataIndex: "answer",
  },
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
    dataIndex: "createTime",
  },
  {
    title: "修改时间",
    dataIndex: "updateTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];
</script>
