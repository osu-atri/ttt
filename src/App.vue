<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'
import Editor from './components/EditorTranscript.vue'

const { t } = useI18n()

const editor1 = useTemplateRef('editor1')
const editor2 = useTemplateRef('editor2')
</script>

<template>
  <v-app>
    <v-app-bar color="primary" density="compact">
      <v-app-bar-title>{{ t('appBar.projectName') }}</v-app-bar-title>

      <template v-slot:append>
        <v-tabs>
          <v-tab>{{ t('tabs.test') }}</v-tab>
          <v-tab>{{ t('tabs.test') }}</v-tab>
          <v-tab>{{ t('tabs.test') }}</v-tab>
          <v-tab>{{ t('tabs.test') }}</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-main>
      <div class="editor-row">
        <Editor ref="editor1" value="// original" editor-id="editor-original" />
        <Editor ref="editor2" value="// translated" editor-id="editor-translated" />
      </div>
    </v-main>
  </v-app>
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
  height: 95vh;
  width: 100%;
}
</style>
