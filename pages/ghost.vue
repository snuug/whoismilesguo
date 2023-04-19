<template>
    <div>
    <NuxtLayout>
      <div v-if="isLoadingContent">Loading...</div>
      <div v-else>
        <div v-for="post in posts" :key="post.id">
          <NuxtLink :to="post.url">{{ post.title }}</NuxtLink>
          <div v-html="post.html"></div>
        </div>
      </div>
    </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
const ghostContent = useGhostContent();
const isLoadingContent = ref(false);

interface Post {
  id: string;
  name: string;
  slug: string;
  url: string;
  [key: string]: any;
}

const posts = ref<Post[]>([]);

onMounted(async () => {
  isLoadingContent.value = true;
  const response = await ghostContent.getPage({ slug: "freedom-of-information" });
  console.log(response);
  posts.value = [response];
  isLoadingContent.value = false;
});
</script>
