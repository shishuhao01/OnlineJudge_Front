<template>
  <Editor :value="value"  :mode="mode" :plugins="plugins" @change="handleChange" />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Editor } from "@bytemd/vue-next";
import Color from "element-plus/es/components/color-picker/src/utils/color";
import { ref, resolveDirective } from "vue";

const plugins = [
  gfm(),
  highlight(),
  // Add more plugins here
];
interface Props {
  value: string;
  mode?:string;
  
  handleChange: (v: string) => void;
}

const Props = withDefaults(defineProps<Props>(), {
  value: () => "",
  mode:"split",
  handleChange: (v: string) => {
  },
});
</script>
<style scoped></style>
