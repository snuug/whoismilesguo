<script setup>
// import { setCssVar } from 'quasar';
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// setCssVar('primary', '#15182d')
// setCssVar('secondary', '#a259ff')
// setCssVar('accent', '#2e0845')
// setCssVar('dark', '#1d1d1d')
// setCssVar('dark-page', '#121212')
// setCssVar('positive', '#21BA45')
// setCssVar('negative', '#C10015')
// setCssVar('info', '#3c8280')
// setCssVar('warning', '#F2C037')

const {
  cookiesEnabled,
  cookiesEnabledIds,
  isConsentGiven,
  isModalActive,
  moduleOptions,
} = useCookieControl();
// example: react to a cookie being accepted
watch(
  () => cookiesEnabledIds.value,
  (current, previous) => {
    if (
      !previous?.includes("google-analytics") &&
      current?.includes("google-analytics")
    ) {
      // cookie with id `google-analytics` got added
      window.location.reload(); // placeholder for your custom change handler
    }
  },
  { deep: true }
);
</script>

<template>
  <div>
    <!-- <Header /> -->
    <NuxtPage />
    <CookieControl locale="en">
      <template #cookie="{ config }">
        <span v-for="c in config" :key="c.id" v-text="c.cookies" />
      </template>
    </CookieControl>
  </div>
</template>
