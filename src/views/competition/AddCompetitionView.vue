<template>
  <div id="CompetitionAdd">
    <a-space direction="vertical" size="large">
      <a-radio-group v-model="status" type="button"> </a-radio-group>
      <a-radio-group v-model="size" type="button"> </a-radio-group>
    </a-space>
    <a-form
      :model="form"
      :style="{ width: '600px', marginTop: '20px' }"
      :size="size"
      v-if="addQuestionForm == true"
    >
      <a-form-item field="competitionTitle" label="比赛名称" feedback>
        <a-input v-model="form.competitionTitle" placeholder="请填写比赛名称" />
      </a-form-item>

      <a-form-item field="post" label="比赛描述" feedback>
        <a-input
          v-model="form.competitionContext"
          placeholder="请输入比赛描述"
        />
      </a-form-item>

      <a-form-item field="language" label="比赛语言" feedback>
        <a-select v-model="form.languageType" placeholder="请选择编程语言">
          <a-option value="java">java</a-option>
          <a-option value="c++">c++</a-option>
          <a-option value="python">python</a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="post" label="比赛日期" feedback>
        <a-date-picker v-model="form.date"></a-date-picker>
      </a-form-item>

      <a-form-item field="post" label="比赛开始时间" feedback>
        <a-time-picker
          v-model="form.startTime"
          format="HH:mm:ss"
        ></a-time-picker>
      </a-form-item>

      <a-form-item field="post" label="比赛结束时间" feedback>
        <a-time-picker v-model="form.endTime" format="HH:mm:ss"></a-time-picker>
      </a-form-item>

      <a-button
        type="primary"
        @click="chooseTitles"
        status="success"
        style="width: 100px; margin-left: 100px"
        >选择比赛题目</a-button
      >
      <br />
      <a-button
        type="primary"
        @click="createCompetition"
        style="width: 100px; margin-left: 100px"
        >创建比赛</a-button
      >
    </a-form>

    <div id="QuestionTable" v-if="addQuestionForm == false">
      <a-table
        row-key="id"
        :columns="columns"
        :data="QuestionsData"
        :row-selection="rowSelection"
        v-model:selectedKeys="selectedKeys"
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
      </a-table>

      <a-button
        type="primary"
        style="min-width: 200px; margin-left: 100px"
        @click="QuestionSubmit"
      >
        提交
      </a-button>
      <a-button
        status="success"
        style="width: 100px; margin-left: 100px"
        @click="createQuestion"
        >创建比题目</a-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRaw } from "vue";
import { Notification, Message } from "@arco-design/web-vue";
import {
  CompetitionAddRequest,
  CompetitionControllerService,
  QuestionControllerService,
  QuestionQueryRequest,
} from "../../../generated";
import { useRoute } from "vue-router";
import moment from "moment";

const selectedKeys = ref(["", ""]);
const rowSelection = reactive({
  type: "checkbox",
  showCheckedAll: true,
  onlyCurrent: false,
});

const route = useRoute();
const updatePage = route.path.includes("update");
const status = ref("success");
const size = ref("medium");
const date = ref("");
const defaultStart = "19:00:00";
const addQuestionForm = ref(true);
let QuestionsData = reactive([]);

const createCompetition = async () => {
  console.log(form.value);
  const res = await CompetitionControllerService.addCompetitionUsingPost(
    form.value
  );
  if (res.code == 0) {
    Message.success("添加成功");
  } else {
    Message.error(res.data);
  }
};
const searchParams = ref<QuestionQueryRequest>({
  pageNum: 1,
  pageSize: 10,
});

const chooseTitles = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
  );
  if (res.code == 0) {
    addQuestionForm.value = false;
    QuestionsData = res.data.records;
  } else {
    console.log("查询题目失败");
  }
};

const QuestionSubmit = async () => {
  form.value.question = Object.values(selectedKeys.value).filter(
    (value) => value != ""
  );
  addQuestionForm.value = true;
};

let form = ref({
  competitionTitle: "",
  competitionContext: "",
  languageType: "",
  question: [""],
} as CompetitionAddRequest);

const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "题目",
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
];
</script>

<style>
#CompetitionAdd {
  text-align: center;
}
</style>
