<template>
  <div class="WAL position-relative" :style="style">
    <q-layout view="lHr lpR lFr" class="WAL__layout">
      <q-header reveal class="q-pl-lg" :class="$q.dark.isActive ? 'bg-black' : 'bg-secondary'">
        <q-toolbar>
          <q-btn class="q-pl-sm" square to="/" unelevated dense :ripple=false>
            <q-avatar square size="70px">
              <q-img src="/logo-dark.svg" no-native-menu />
            </q-avatar>
          </q-btn>
          <q-space />
          <q-toggle v-model="isDarkMode" @update:model-value="toggleDarkMode" :true-value="true" :false-value="false"
            checked-icon="ion-moon" color="accent" unchecked-icon="ion-sunny" size="45px" />
          <q-btn dense flat  icon="menu" @click="toggleRightDrawer" />
        </q-toolbar>
        <q-toolbar inset class="gt-sm">
          <q-space />
          <!-- dropdown menu -->
          <layout-toolbar-menu />
        </q-toolbar>
      </q-header>

      <q-drawer v-model="rightDrawerOpen" side="right" overlay>
        <div class="row justify-end q-pr-md">
          <q-btn dense flat icon="close" class="q-mt-md" color="secondary" @click="toggleRightDrawer" />
        </div>
        <!-- drawer content -->
      </q-drawer>

      <q-page-container class="q-ma-sm">
        <slot />
      </q-page-container>

      <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
        <q-btn fab icon="ion-arrow-dropup-circle" color="info" />
      </q-page-scroller>
      <q-footer reveal class="lt-sm" :class="$q.dark.isActive ? 'bg-black' : 'bg-secondary'">
        <q-toolbar class="justify-center">
          <!-- dropdown menu -->
          <layout-toolbar-menu />
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>
  
<script setup lang="ts">
const $q = useQuasar()
const isDarkMode = ref($q.dark.isActive)
const rightDrawerOpen = ref(false)

const style = computed(() => ({
  height: $q.screen.height + 'px'
}))

const toggleDarkMode = (value: boolean) => {
  $q.dark.set(value)
};

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value
}
</script>
<style lang="sass" scoped>
.header-bg
  background-color: var(--primary)
.WAL
  width: 100%
  height: 100%
  // padding-top: 20px
  // padding-bottom: 20px

  &:before
    content: ''
    height: 70px
    position: fixed
    top: 0
    width: 100%
    background-color: --primary

  &__layout
    margin: 0 auto
    z-index: 4000
    height: 100%
    width: 85%
    max-width: 950px
    border-radius: 5px
    scrollbar-width: none
    -ms-overflow-style: none
    font-size: 1.1rem
    line-height: 1.5

    &__layout::-webkit-scrollbar 
      display: none

  &__field.q-field--outlined .q-field__control:before
    border: none

  .q-drawer--standard
    .WAL__drawer-close
      display: none

@media (max-width: 850px)
  .WAL
    padding: 0
    &__layout
      width: 100%
      border-radius: 0

@media (min-width: 691px)
  .WAL
    &__drawer-open
      display: none
</style>