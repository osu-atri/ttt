<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import TranslateView from './ViewTranslate.vue'

const { t } = useI18n()
const tab = ref(0)
</script>

<template>
  <v-app>
    <v-app-bar color="primary" density="compact">
      <v-app-bar-title>{{ t('appBar.projectName') }}</v-app-bar-title>

      <template v-slot:append>
        <v-tabs v-model="tab">
          <v-tab>{{ t('tabs.test') }}</v-tab>
          <v-tab>{{ t('tabs.test') }}</v-tab>
          <v-tab>{{ t('tabs.test') }}</v-tab>
          <v-tab>{{ t('tabs.test') }}</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-main>
      <TranslateView v-if="tab === 0" />
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
