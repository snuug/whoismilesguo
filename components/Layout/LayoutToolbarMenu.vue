<template>
  <q-btn-group class="no-shadow">
    <q-btn size="md" label="Story of Miles" to="/story-of-miles" icon-right="ion-bonfire" />
    <q-btn-dropdown size="md" auto-close label="Recent Events" dropdown-icon="ion-paper">
      <q-list>
        <q-item-label header>Hot Events</q-item-label>
        <q-item v-for="n in 3" :key="`x.${n}`" clickable v-close-popup tabindex="0">
          <q-item-section avatar>
            <q-avatar icon="ion-filing" color="secondary" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Documents {{ n }}</q-item-label>
            <q-item-label caption>March 15, 2023</q-item-label>
          </q-item-section>
          <!-- <q-item-section side>
            <q-icon name="info" />
          </q-item-section> -->
        </q-item>
        <q-separator inset spaced />
        <q-item-label header>Relate Topics</q-item-label>
        <q-item v-for="n in 4" :key="`y.${n}`" clickable v-close-popup tabindex="0">
          <q-item-section avatar>
            <q-avatar icon="ion-chatbubbles" color="primary" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Topic {{ n }}</q-item-label>
            <q-item-label caption>February 22, 2016</q-item-label>
          </q-item-section>
          <!-- <q-item-section side>
            <q-icon name="info" />
          </q-item-section> -->
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </q-btn-group>
</template>

<script setup lang="ts">

</script>

<style scoped></style>