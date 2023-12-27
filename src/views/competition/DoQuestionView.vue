<template>
  <div id="viewQuestionView">
    <div style="margin-left: 600px; font-size: 30px">
      倒计时: {{ countdown }}
    </div>
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs :active-key="selectKeys" @tab-click="changeKeys">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question != null" :title="question.title">
              <a-descriptions
                title="判题条件"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="时间限制">
                  {{ judgeConfig.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ judgeConfig.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ judgeConfig.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <h2>题目描述</h2>
              <MdEditor :value="question.content" />

              <template #extra>
                <a-space wrap>
                  <template v-for="(tag, index) of tags" :key="index">
                    <a-tag v-if="tag == '中等'" color="orange"
                      >{{ tag }}
                    </a-tag>
                    <a-tag v-else-if="tag == '困难'" color="red"
                      >{{ tag }}
                    </a-tag>
                    <a-tag v-else-if="tag == '简单'" color="blue"
                      >{{ tag }}
                    </a-tag>
                    <a-tag v-else color="green">{{ tag }} </a-tag>
                  </template>
                </a-space>
              </template>
              <a-descriptions title="示例1" :column="{ xs: 1, md: 1, lg: 1 }">
                <a-descriptions-item label="输入示例">
                  [{{ judgeCase[0].input ?? 0 }}]
                </a-descriptions-item>
                <a-descriptions-item label="输出实例">
                  [{{ judgeCase[0].output ?? 0 }}]
                </a-descriptions-item>
              </a-descriptions>
              <template v-if="judgeCase[1] != null">
                <a-descriptions title="示例2" :column="{ xs: 1, md: 1, lg: 1 }">
                  <a-descriptions-item label="输入示例">
                    [{{ judgeCase[1].input ?? 0 }}]
                  </a-descriptions-item>
                  <a-descriptions-item label="输出实例">
                    [{{ judgeCase[1].output ?? 0 }}]
                  </a-descriptions-item>
                </a-descriptions>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" title="评论" closable> 评论区</a-tab-pane>
          <a-tab-pane key="answer" title="答案">
            <pre>{{ code }}</pre>
          </a-tab-pane>
          <a-tab-pane
            key="submitMsg"
            title="提交记录"
            @click="checkSubmitMsg"
            closable
          >
            <a-table :columns="columns" :data="submitMsg">
              <template #judgeInfo="{ record }">
                <a-space
                  v-if="record.judgeInfo.message == '答案错误'"
                  style="color: #ff0000"
                >
                  {{ record.judgeInfo.message }}
                </a-space>
                <a-space
                  v-if="
                    record.judgeInfo.message == '超时' ||
                    record.judgeInfo.message == '程序运行时异常'
                  "
                  style="color: #0000ff"
                >
                  {{ record.judgeInfo.message }}
                </a-space>
                <a-space
                  v-if="record.judgeInfo.message == '危险操作'"
                  style="color: red"
                >
                  {{ record.judgeInfo.message }}
                </a-space>
                <a-space
                  v-if="record.judgeInfo.message == '编译错误'"
                  style="color: #eb0aa4"
                >
                  {{ record.judgeInfo.message }}
                </a-space>
                <a-space
                  v-else-if="record.judgeInfo.message == '成功'"
                  style="color: #00ff00"
                >
                  {{ record.judgeInfo.message }}
                </a-space>

                <a-space
                  v-if="record.judgeInfo.message == '内存溢出'"
                  style="color: #0066ff"
                >
                  {{ record.judgeInfo.message }}
                </a-space>

                <a-space
                  v-if="record.judgeInfo.message == '成功'"
                  style="margin-left: 10px"
                >
                  time: {{ record.judgeInfo.time }}ms
                </a-space>
                <a-space
                  v-if="record.judgeInfo.message == '成功'"
                  style="margin-left: 10px"
                >
                  memory: {{ record.judgeInfo.memoryLimit }}KB
                </a-space>
              </template>
              <template #status="{ record }">
                <a-space v-if="record.status == 2" style="color: #00ff00">
                  完成
                </a-space>
                <a-space v-else-if="record.status == 1" style="color: #ffff66">
                  判题中
                </a-space>
                <a-space v-else-if="record.status == 0" style="color: #ccffff">
                  等待中
                </a-space>
                <a-space v-else-if="record.status == 3" style="color: #ff0000">
                  判题失败
                </a-space>
              </template>
              <template #updateTime="{ record }">
                <a-space>
                  {{ moment(record.updateTime).format("YYYY-MM-DD  HH:mm:ss") }}
                </a-space>
              </template>
            </a-table>
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
              <a-option>html</a-option>
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
import { onMounted, ref, watch,onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import moment from "moment";
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionVO,
  Question,
  QuestionSubmitQueryRequest,
  UserCompetitionRecordDoQuestionRequest,
  UserCompetitionRecordService,
} from "../../../generated";
import CodeEditor from "@/components/CodeEditor.vue";
import MdEditor from "@/components/MdEditorViewer.vue";
import { en } from "element-plus/es/locale";

const question = ref<Question>();
const router = useRouter();
const route = useRoute();
const color = "green";
let judgeCase = ref();
const tags = ref();
const code = ref();
const judgeConfig = ref();
const submitMsg = ref();
const selectKeys = ref("question");

const competitionId = route.query.competitionId;
const questionId = route.query.questionId;
const endTime = route.query.endTime;
let timerId: number | null = null

const changeKeys = (value: string) => {
  selectKeys.value = value;
};

const getQuestionVO = async () => {
  const res = await QuestionControllerService.getQuestionByIdUsingGet(
    questionId as any
  );

  if (res.code == 0) {
    question.value = res.data;
    tags.value = JSON.parse(res.data?.tags as any);
    judgeCase.value = JSON.parse(res.data?.judgeCase as any);
    code.value = res.data?.answer;
    judgeConfig.value = JSON.parse(res.data?.judgeConfig as any);
    const res2 =
      await QuestionControllerService.listQuestionSubmitByPageUsingPostUser(
        userSubmitMsg.value
      );
    if (res2.code == 0) {
      submitMsg.value = res2.data.records;
    }
  } else {
    Message.error("查询失败");
  }
};

const changCode = (value: string) => {
  form.value.code = value;
};

onMounted(() => {
  getQuestionVO();
  console.log(endTime);
});

const countdown = ref("");

const calculateCountdown = () => {
  if (typeof endTime === "string") {
    const now = new Date();
    const end = new Date();
    end.setHours(parseInt(endTime.split(":")[0]));
    end.setMinutes(parseInt(endTime.split(":")[1]));
    end.setSeconds(parseInt(endTime.split(":")[2]));

    const diff = end.getTime() - now.getTime();

    if (diff <= 0) {
      countdown.value = "00:00:00";
      router.push("/competition/participate");
    } else {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      countdown.value = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
  }
};

timerId = window.setInterval(calculateCountdown, 1000)

    onUnmounted(() => {
      if (timerId) {
        window.clearInterval(timerId)
      }
    })

const form = ref<UserCompetitionRecordDoQuestionRequest>({
  code:
    "// 注意,所有的参数从args数组中输入,结果打印在控制台即可 \n" +
    "public class Main{ \n" +
    "    public static void main(String[] args){ \n" +
    "\n" +
    "    }\n" +
    "} \n",
  language: "java",
  questionId: questionId as any,
  competitionId: competitionId as any,
});

const store = useStore();
const user = store.state.user.loginUser;

const userSubmitMsg = ref<QuestionSubmitQueryRequest>({
  questionId: route.params.id as any,
  userId: user.id,
});

const doSubmit = async () => {
  console.log(countdown);
  const res = await UserCompetitionRecordService.DoCompetitionQuestion(
    form.value
  );
  if (res.code == 0) {
    Message.success("题目正确");
    router.push({
      path: `/competition/online/${competitionId}`,
    });
  } else {
    Message.error("失败");
  }
};

const columns = [
  {
    title: "编程语言",
    dataIndex: "language",
  },
  {
    title: "提交用户姓名",
    dataIndex: "userVO.userName",
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

<style></style>
