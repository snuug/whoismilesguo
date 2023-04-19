<template>
  <div>
    <ShowErrorMessage />
    <h1>Bot List</h1>
    <client-only>
      <ul v-if="!listBotsStore.isLoadingBots">
        <li v-for="bot in listBotsStore.botList" :key="bot._id" style="padding: 4px">
          <va-avatar src="https://picsum.photos/150/" class="mr-6" />
          <span @click="listBotsStore.setSelectedBot(bot._id)" style="cursor: pointer">
            {{ bot.bot_name }} - {{ bot.description }}
          </span>
        </li>
      </ul>
      <div v-else>Loading...</div>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { useListBotsStore } from "@/store/bots";
const listBotsStore = useListBotsStore();
onMounted(async () => {
  // load the bot list
  await listBotsStore.loadBotList();
});
</script>
