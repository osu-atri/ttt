<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'
import TranslateView from './ViewTranslate.vue'

const { t } = useI18n()
const tab = ref(0)
const translateViewRef = useTemplateRef('translate-view')
</script>

<template>
  <v-app>
    <v-app-bar color="primary" height="60" extended extension-height="40">
      <v-app-bar-title>{{ t('appBar.projectName') }}</v-app-bar-title>

      <template v-slot:append>
        <v-tabs v-model="tab">
          <v-tab>{{ t('appBar.tabs.translate') }}</v-tab>
          <v-tab>{{ t('appBar.tabs.timeline') }}</v-tab>
          <v-tab>{{ t('appBar.tabs.effect') }}</v-tab>
          <v-tab>{{ t('appBar.tabs.produce') }}</v-tab>
        </v-tabs>
      </template>

      <template v-slot:extension>
        <v-tabs v-if="tab === 0">
          <v-btn variant="tonal" close-on-content-click>
            {{ t('appBar.menu.translate.file.self') }}
            <v-menu activator="parent">
              <v-list density="compact">
                <v-list-item
                  :title="t('appBar.menu.translate.file.import')"
                  @click="translateViewRef?.importFileTxt()"
                />
                <v-list-item
                  :title="t('appBar.menu.translate.file.export')"
                  @click="translateViewRef?.exportFileTxt()"
                />
              </v-list>
            </v-menu>
          </v-btn>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-main>
      <TranslateView ref="translate-view" v-if="tab === 0" />
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
:deep(header.v-toolbar) {
  box-sizing: border-box;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

:deep(div.v-toolbar__extension) {
  background-color: #ff70b7;
  border-top: #fff 1px solid;
  > div.v-tabs {
    align-items: center;
  }
}

:deep(div.v-list) {
  overflow: hidden;
  padding: 0;
}
</style>
