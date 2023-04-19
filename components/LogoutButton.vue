<template>
  <button @click="logout">Logout</button>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();
const router = useRouter();

const props = defineProps({
  redirectUrl: {
    type: String,
    default: "/login",
  },
});

const logout = () => {
  authStore.logout()
  router.push(props.redirectUrl.valueOf());
};
</script>
