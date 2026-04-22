<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import Editor from '@/components/EditorTranscript.vue'

const editorOriginal = useTemplateRef('editor-original')
const editorTranslated = useTemplateRef('editor-translated')
</script>

<template>
  <div class="editor-row">
    <Editor ref="editor-original" value="// original" id="editor-original" />
    <Editor ref="editor-translated" value="// translated" id="editor-translated" />
  </div>
</template>

<style scoped>
.editor-row {
  display: flex;
  height: 100%;
  width: 100%;
}
</style>
