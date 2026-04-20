import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEditorStore = defineStore('editor', () => {
  const cursorLine = ref(1)
  const setCursorLine = (line: number) => {
    cursorLine.value = line
  }

  const lineCount = ref(1)
  const setLineCount = (count: number) => {
    lineCount.value = count
  }

  return {
    cursorLine,
    lineCount,
    setCursorLine,
    setLineCount,
  }
})
