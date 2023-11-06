<template>
  <Viewer :value="value" :plugins="plugins" />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Viewer } from "@bytemd/vue-next";
import Color from "element-plus/es/components/color-picker/src/utils/color";

const plugins = [
  gfm(),
   highlight(),
   
   ];
interface Props {
  value: string;
}

const Props = withDefaults(defineProps<Props>(), {
  value: () => "",
});
</script>
<style scoped></style>
