<script setup lang="ts">
import { useTemplateRef } from 'vue'
import Editor from '@/components/EditorTranscript.vue'

const editorOriginal = useTemplateRef('editor-original')
const editorTranslated = useTemplateRef('editor-translated')

function handleOriginalLineCount(count: number) {
  editorTranslated.value?.syncToLineCount(count)
}

function handleTranslatedLineCount(count: number) {
  editorOriginal.value?.syncToLineCount(count)
}
</script>

<template>
  <div class="editor-row">
    <Editor
      ref="editor-original"
      value="// original"
      id="editor-original"
      @line-count-change="handleOriginalLineCount"
    />
    <Editor
      ref="editor-translated"
      value="// translated"
      id="editor-translated"
      @line-count-change="handleTranslatedLineCount"
    />
  </div>
</template>

<style scoped>
.editor-row {
  display: flex;
  height: 100%;
  width: 100%;
}
</style>
