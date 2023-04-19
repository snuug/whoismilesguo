import { useAuthStore } from "@/store/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  await authStore.loadSession();
  await authStore.createJWT();

  if (!authStore.userSession) {
    return console.log("No user session found");
  }
});