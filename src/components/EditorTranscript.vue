<script setup lang="ts">
import { onMounted, useTemplateRef, watch } from 'vue'
import * as monaco from 'monaco-editor'
import { useEditorStore } from '@/stores/editor'

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
      useEditorStore().setLineCount(model.getLineCount())
    }

    editor.onDidChangeModelContent(() => {
      const lineCount = editor.getModel()?.getLineCount() ?? 1
      useEditorStore().setLineCount(lineCount)
    })

    editor.onDidChangeCursorPosition((e) => {
      const line = e.position.lineNumber
      useEditorStore().setCursorLine(line)
    })
  }
})

watch(
  () => useEditorStore().lineCount,
  (newCount) => {
    const model = editor.getModel()
    if (!model) return

    const currentCount = model.getLineCount()
    if (newCount === currentCount) return

    if (newCount > currentCount) {
      const newLines = []
      for (let i = 0; i < newCount - currentCount; i++) {
        newLines.push('')
      }
      model.setValue(model.getValue() + '\n' + newLines.join('\n'))
    } else {
      const lines = model.getValue().split('\n')
      const newLines = lines.slice(0, newCount)
      model.setValue(newLines.join('\n'))
    }
  },
)

defineExpose({ editor })
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
