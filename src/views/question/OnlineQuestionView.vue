<template>
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question != null" :title="question.title">
              <a-descriptions
                title="判题条件"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="时间限制">
                  {{judgeConfig.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ judgeConfig.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{judgeConfig.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <h2>题目描述</h2>
              <MdEditor :value="question.content" />


              <template #extra>
                <a-space wrap>
                  <template v-for="(tag, index) of tags" :key="index">
                  <a-tag v-if="tag == '中等'"
                    color="orange"
                    >{{ tag }}
                  </a-tag>
                  <a-tag v-else-if="tag == '困难'"
                    color="red"
                    >{{ tag }}
                  </a-tag>
                  <a-tag v-else-if="tag == '简单'" 
                    color="blue"
                    >{{ tag }}
                  </a-tag>
                  <a-tag v-else 
                    color="green"
                    >{{ tag }}
                  </a-tag>
                  </template>
                </a-space>



              </template>
              <a-descriptions
                title="示例"
                :column="{ xs: 1, md: 1, lg: 1 }"
              >
                <a-descriptions-item label="输入示例1"> 
                  [{{ judgeCase[0].input ?? 0 }}]
                </a-descriptions-item>
                <a-descriptions-item label="输出实例1">
                  [{{ judgeCase[0].output ?? 0 }}]
                </a-descriptions-item>
              </a-descriptions>
               <template v-if="judgeCase[1] != null">
                <a-descriptions
                title="示例"
                :column="{ xs: 1, md: 1, lg: 1 }"   
              >
                <a-descriptions-item label="输入示例2"> 
                  [{{ judgeCase[1].input ?? 0 }}]
                </a-descriptions-item>
                <a-descriptions-item label="输出实例2">
                  [{{ judgeCase[1].output ?? 0 }}]
                </a-descriptions-item>
              </a-descriptions>
               </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" title="评论" closable> 评论区</a-tab-pane>
          <a-tab-pane key="answer" title="答案"> 
             <pre>{{code}}</pre>
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item
            field="language"
            label="编程语言"
            style="min-width: 240px"
          >
            <a-select
              v-model="form.language"
              :style="{ width: '320px' }"
              placeholder="选择编程语言"
            >
              <a-option>java</a-option>
              <a-option>cpp</a-option>
              <a-option>go</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <CodeEditor
          :value="form.code"
          :language="form.language"
          :handleChange="changCode"
        />
        <a-divider size="0" />
        <a-button type="primary" style="min-width: 200px" @click="doSubmit">
          提交代码
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionVO,
  Question
} from "../../../generated";
import CodeEditor from "@/components/CodeEditor.vue";
import MdEditor from "@/components/MdEditorViewer.vue";

const question = ref<Question>();
const route = useRoute();
const questionId = route.params.id;
const color = "green"
let judgeCase = ref()
const tags = ref()
const code = ref()
const judgeConfig = ref();
const getQuestionVO = async () => {

  const res = await QuestionControllerService.getQuestionByIdUsingGet(
    questionId as any
  );
  if (res.code == 0) {
    question.value = res.data;
    tags.value = JSON.parse(res.data?.tags as any);
    judgeCase.value = JSON.parse(res.data?.judgeCase as any);
    code.value = res.data?.answer;
    judgeConfig.value = JSON.parse(res.data?.judgeConfig as any)
  } else {
    Message.error("查询失败");
  }
};

const changCode = (value: string) => {
  form.value.code = value;
};

onMounted(() => {
  getQuestionVO();
});
const form = ref<QuestionSubmitAddRequest>({
  code: "",
  language: "",
  questionId: questionId as any,
});

const doSubmit = async () => {
  const res = await QuestionControllerService.doQuestionSubmitUsingPost(
    form.value
  );
  console.log(form.value);
  if (res.code === 0) {
    Message.success("提交成功");
  } else {
    console.log(res);

  }
};
</script>

<style></style>
