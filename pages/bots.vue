<template>
  <div class="row">
    <div class="flex md3">
      <div class="item">
      <ListBots />
      </div>
    </div>
    <div class="flex md12">
      <div class="item">
        <BaseInput label="Bot Name" v-model="bot_name" />
        <BaseInput label="Bot Description" v-model="bot_description" />
        <BaseInput type="textarea" label="Bot Prompt" v-model="bot_prompt" />
        <BaseButton label="Add Bot" @click="submitText" />
        <span>{{ bot_name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const protectedPage = useProtectedPage("/login", "Please login.");
const bot_name = ref("");
const bot_description = ref("");
const bot_prompt = ref("");
const bot_temperature = ref(0);
const buttonSubmit = ref("Add Bot");
const submitText = () => {
  let data = {
    bot_name: bot_name.value,
    description: bot_description.value,
    setting: bot_prompt.value,
    temperature: bot_temperature.value,
  };
  console.log(data);
};
</script>

<style scoped></style>
