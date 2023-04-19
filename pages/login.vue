<template>
  <div class="boxes-container">
    <div><ShowErrorMessage /></div>
    <va-card class="login-card">
      <va-card-title>Please Login </va-card-title>
      <va-card-content>
        <LoginButton provider="discord" /> 
        <LoginButton provider="github" /> 
        <!-- <LoginButton :disabled='true' provider="gettr(Coming soon)" /> 
        <LogoutButton redirectUrl="/chat" /> -->
      </va-card-content>
    </va-card>
  </div>
</template>
<script setup>
import { useAuthStore } from "@/store/auth";
// const router = useRouter();
const authStore = useAuthStore();

definePageMeta({
  middleware: ["auth"]
});

onMounted(async () => {
  // await authStore.loadSession();
  // console.log(authStore.userSession)
  if (authStore.userSession) {
    console.log("User logged in");
    console.log("User's username:", authStore.userSession.name);
    // Redirect the user to another page if they're already logged in
    // router.push("/");
  } else {
    console.log("User not logged in");
    // alert("Please login");
  }
});
</script>
<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.login-card {
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
}
</style>
