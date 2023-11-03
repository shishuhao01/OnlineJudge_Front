<template>
  <div>
    <MdEditor :value="MdValue" :handle-change="MdOnChange" />
    <CodeEditor :value="codeValue" :handle-change="codeOnChange" />
  </div>
</template>

<script setup lang="ts">
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import { ref } from "vue";

const codeValue = ref();

const codeOnChange = (v: string) => {
  codeValue.value = v;
};

const MdValue = ref();

const MdOnChange = (v: string) => {
  MdValue.value = v;
};
</script>

<style></style>
