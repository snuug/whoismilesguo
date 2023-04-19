import { defineStore } from "pinia";
import { useGlobalStore } from "./global";
import { useAuthStore } from "@/store/auth";

// This is the interface for the bot
interface Bot {
  _id: string;
  bot_name: string;
  description: string;
  temperature: number;
  setting: string;
}
// This is the interface for the list of bots
interface BotList {
  data: Bot[];
  total: number;
}
// This is the store that is used to manage the list of bots
export const useListBotsStore = defineStore("listBots", {
  state: () => ({
    botList: [] as Bot[],
    isLoadingBots: false,
    selectedBot: null as Bot | null,
  }),
  persist: true,
  actions: {
    // This is used to load the list of bots
    async loadBotList(): Promise<void> {
      const authStore = useAuthStore();
      const globalStore = useGlobalStore();

      this.isLoadingBots = true;
      // Load the user's session
      await authStore.loadSession();
      if (!authStore.userJwt) {
        globalStore.setError({
          show: true,
          message: "JWT not found, Please login first.",
        });
        return;
      }
      const headers = {
        "Content-Type": "application/json",
        "X-Appwrite-Project": useRuntimeConfig().appwrite.project,
        "X-Appwrite-JWT": authStore.userJwt,
      };
      // This is the GraphQL query that is used to get the list of bots
      const response: Response = await fetch(
        `${useRuntimeConfig().public.appwrite.endpoint}/graphql`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            query: `query {
                        databasesListDocuments(
                            databaseId: "${
                              useRuntimeConfig().public.database
                            }",
                            collectionId: "${
                              useRuntimeConfig().public.botCollection
                            }"
                        ) {
                            documents {
                                _id
                                data
                            }
                        }
                    }`,
          }),
        }
      );

      if (!response.ok) {
        globalStore.setError({
          show: true,
          message: `Failed to load bot list: ${response.status} ${response.statusText}`,
        });
        return;
      }
      const contentType = response.headers.get("content-type");
      let responseData;
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }
      this.botList = responseData.data.databasesListDocuments.documents.map(
        (bot: any) => {
          const { _id, data } = bot;
          const { bot_name, description, temperature, setting } =
            JSON.parse(data);
          return { _id, bot_name, description, temperature, setting };
        }
      );
      this.isLoadingBots = false;
    },
    // This is used to set the selected bot
    setSelectedBot(botId: string): void { 
      this.selectedBot = this.botList.find((bot) => bot._id === botId) || null;
    },
  },
  getters: {
    // This is used to get the selected bot
    getSelectedBot(): Bot | null {
      return this.selectedBot;
    },
  },
});
