<template>
  <main>
  <div class="boxes-container">
    <h1>Summarize Article</h1>
    <input v-model="url" @keyup.enter="summarizeArticle" placeholder="Enter Article URL" size="20"  />
    <va-button
      :disabled="isLoadingContent"
      :loading="isLoadingContent"
      @click="summarizeArticle">
      Summarize
      </va-button>
      <va-button
      :disabled="isLoadingContent"
      :loading="isLoadingContent"
      @click="summarizeArticle">
      What am I reading?
      </va-button>
    <client-only>
    <div v-if="summary">
      <h2>Summary</h2>
      <div >{{ summary }}</div>
    </div>
    </client-only>
  </div>
  </main>
</template>

<script setup lang="ts">
const url = ref("");
const summary = ref(null);
const isLoadingContent = ref(false);

url.value = "https://finance.yahoo.com/news/svb-hearing-consumer-confidence-quarter-end-what-to-know-this-week-160131519.html"

async function summarizeArticle() {
  if (!url.value) {
    alert("Please enter an article URL.");
    return;
  }
  let count = 0;
  isLoadingContent.value = true;
  console.log(count++)
  const response = await $fetch("/api/summarize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ url: url.value })
  });
  const data = await JSON.parse(response.body);
  if (response.statusCode !== 200) {
    console.log("Error: " + response.statusCode);
    return;
  }
  summary.value = data.content;
  isLoadingContent.value = false;
}

// use useIntersectionObserver from vueuse library, to detect when the element is in view, and what is the text content in the view

</script>
