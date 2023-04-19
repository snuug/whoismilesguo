<template>
  <q-btn :loading="loading" type="primary" loading-text="Loading..." @click="loginWithProvider">{{ provider }}</q-btn>
</template>

<script setup>
import { useAuthStore } from "@/store/auth";
const authStore = useAuthStore();
const loading = ref(false);
const props = defineProps({
  provider: {
    type: String,
    required: true,
  },
  redirectUrl: {
    type: String
  },
  errorRedirectUrl: {
    type: String
  },
});
const loginWithProvider = async () => {
  loading.value = true;
  await authStore.handleOAuth(props.provider,props.redirectUrl,props.errorRedirectUrl);
  loading.value = false;
};

</script>
