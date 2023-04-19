<template>
  <div class="row justify-between" color="primary">
      <div span="8" class="logo">Stand with Freedom</div>
      <div span="2"><NuxtLink to="/">Home</NuxtLink></div>
      <div span="2"><NuxtLink to="/test">Test</NuxtLink></div>
      <div span="2"><NuxtLink to="/bots">Bot List</NuxtLink></div>
      <div span="2"><NuxtLink to="/summarize">Summarize</NuxtLink></div>
      <div span="2"><NuxtLink to="/observe">Observer</NuxtLink></div>
      <client-only>
      <div span="2" v-if="!authStore.isLoggedIn"><NuxtLink to="/login">Login</NuxtLink></div>
      <div span="2" v-if="authStore.isLoggedIn"><NuxtLink to="/profile">Profile</NuxtLink></div>
      <div span="2" v-if="authStore.isLoggedIn"><NuxtLink to="#" @click="authStore.logout()"> Logout </NuxtLink></div>
      </client-only>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/store/auth";
const authStore = useAuthStore();
</script>