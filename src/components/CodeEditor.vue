<template>
  <div id="code-editor" ref="codeEditorRef" style="min-height: 400px" />
</template>

<script setup lang="ts">
import { DefaultProps } from "element-plus";
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw } from "vue";

interface Props {
  value: string;
  handleChange: (v: string) => void;
}

const Props = withDefaults(defineProps<Props>(), {
  vlaue: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
});

const codeEditorRef = ref();
const codeEditor = ref();
const value = ref();

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  // Hover on each property to see its docs!
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: value.value,
    language: "java",
    automaticLayout: true,
    colorDecorators: true,
    minimap: {
      enabled: true,
    },
    readOnly: false,
    theme: "vs-dark",
  });
  codeEditor.value.onDidChangeModelContent(() => {
  });
});
</script>

<style></style>
