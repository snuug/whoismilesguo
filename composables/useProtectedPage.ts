import { useAuthStore } from "@/store/auth";
import { useGlobalStore } from "@/store/global";

// const router = useRouter();
// const authStore = useAuthStore();
// const globalStore = useGlobalStore();

export default function useProtectedPage(redirectUrl = "/login", msg = "Please login to view this page.") {
  const authStore = useAuthStore();
  const globalStore = useGlobalStore();
  const router = useRouter();

  onMounted(() => {
    if (!authStore.userSession) {
      globalStore.setError({
        show: true,
        message: "Please login to view this page."
      });
      router.push(redirectUrl);
    }
  });
}