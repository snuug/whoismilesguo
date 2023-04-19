import { defineStore, acceptHMRUpdate } from "pinia";

interface ErrorObject {
  show: boolean;
  message: string;
}

export const useGlobalStore = defineStore("global", {
  state: () => ({
    error: null as ErrorObject | null,
  }),
  persist: true,
  actions: {
    setError(error: ErrorObject) {
      this.error = error;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot));
}
