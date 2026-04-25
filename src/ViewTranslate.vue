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

function importFileTxt() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.txt'
  input.onchange = async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (!file) return
    const text = await file.text()
    editorOriginal.value?.setValue(text)
    editorTranslated.value?.setValue('')
  }
  input.click()
}

function exportFileTxt() {
  const origContent = editorOriginal.value?.getValue() ?? ''
  const transContent = editorTranslated.value?.getValue() ?? ''
  downloadTxt('original.txt', origContent)
  downloadTxt('translated.txt', transContent)
}

function downloadTxt(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

defineExpose({ importFileTxt, exportFileTxt })
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
