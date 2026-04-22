<script setup lang="ts">
import { ref } from 'vue'
import Editor from './components/EditorTranscript.vue'

const editor1 = ref<InstanceType<typeof Editor> | null>(null)
const editor2 = ref<InstanceType<typeof Editor> | null>(null)
</script>

<template>
  <div class="editor-row">
    <Editor ref="editor1" value="// original" editor-id="editor-original" />
    <Editor ref="editor2" value="// translated" editor-id="editor-translated" />
  </div>
</template>

<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>

<style scoped>
.editor-row {
  display: flex;
  height: 100%;
  width: 100%;
}
</style>
