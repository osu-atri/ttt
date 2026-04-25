<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import * as monaco from 'monaco-editor'

const props = withDefaults(
  defineProps<{
    value?: string
    options?: monaco.editor.IStandaloneEditorConstructionOptions
  }>(),
  {
    value: '// Monaco Editor',
    options: undefined,
  },
)

const emit = defineEmits<{
  (e: 'lineCountChange', count: number): void
}>()

const container = useTemplateRef('container')
let editor: monaco.editor.IStandaloneCodeEditor

onMounted(() => {
  if (container.value) {
    editor = monaco.editor.create(container.value, {
      value: props.value,
      theme: 'vs-dark',
      automaticLayout: true,
      minimap: { enabled: false },
      ...props.options,
    })

    const model = editor.getModel()
    if (model) {
      emit('lineCountChange', model.getLineCount())
    }

    editor.onDidChangeModelContent(() => {
      const lineCount = editor.getModel()?.getLineCount() ?? 1
      emit('lineCountChange', lineCount)
    })
  }
})

function syncToLineCount(targetCount: number) {
  if (!editor) return
  const model = editor.getModel()
  if (!model) return

  const currentCount = model.getLineCount()
  if (targetCount === currentCount) return

  if (targetCount > currentCount) {
    const lastLine = model.getLineCount()
    const lastColumn = model.getLineMaxColumn(lastLine)
    editor.executeEdits('line-sync', [
      {
        range: {
          startLineNumber: lastLine,
          startColumn: lastColumn,
          endLineNumber: lastLine,
          endColumn: lastColumn,
        },
        text: '\n'.repeat(targetCount - currentCount),
        forceMoveMarkers: true,
      },
    ])
  } else {
    const lines = model.getLinesContent()
    const newLines = lines.slice(0, targetCount)
    editor.executeEdits('line-sync', [
      {
        range: {
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: currentCount,
          endColumn: model.getLineMaxColumn(currentCount),
        },
        text: newLines.join('\n'),
        forceMoveMarkers: true,
      },
    ])
  }
}

defineExpose({ syncToLineCount, setValue, getValue })

function setValue(text: string) {
  if (!editor) return
  editor.setValue(text)
}

function getValue(): string {
  if (!editor) return ''
  return editor.getValue()
}
</script>

<template>
  <div ref="container"></div>
</template>

<style scoped>
div {
  width: 100%;
  height: 100%;
}
</style>
