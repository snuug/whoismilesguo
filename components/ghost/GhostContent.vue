<template>
  <main>
    <aside class="table-of-contents">
      <ul>
        <li
          v-for="(header, index) in headers"
          :key="index"
          :class="{ active: header.isActive }"
          @click="scrollToHeader(header.id)"
        >
          {{ header.text }}
        </li>
      </ul>
    </aside>
    <article v-if="post" class="max-w-4xl" ref="postRef">
      <h1 class="va-h1">{{ post.title }}</h1>
      <div v-html="postHtmlWithVaImg"></div>
    </article>
  </main>
</template>

<script setup>
// import { ref, watch, onMounted, onUnmounted } from "vue";
const postRef = ref(null);
const ghostContent = useGhostContent();


const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
  h: {
    type: String,
    default: "h1",
  },
  ptype: {
    type: String,
    default: "post",
  },
});

const post = ref(null);
const headers = ref([]);
let observer;

function scrollToHeader(id) {
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: "smooth" });
}

function handleIntersection(entries) {
  entries.forEach((entry) => {
    const header = headers.value.find((h) => h.id === entry.target.id);
    if (header) {
      header.isActive = entry.isIntersecting;
    }
  });
}

async function fetchPost() {
  try {
    if (props.ptype === "post") {
      const response = await ghostContent.getPost({ slug: props.slug }, { formats: ["html"] });
      post.value = response;
    } else if (props.ptype === "page") {
      const response = await ghostContent.getPage({ slug: props.slug }, { formats: ["html"] });
      post.value = response;
    }
  } catch (error) {
    console.error("Failed to fetch post:", error);
  }
}

function updateTableOfContents() {
  if (postRef.value) {
    const headerElements = postRef.value.querySelectorAll(props.h);
    
    headers.value = Array.from(headerElements).map((header, index) => ({
      id: `header-${index}`,
      text: header.textContent || '',
      isActive: false,
    }));

    headerElements.forEach((header, index) => {
      header.id = `header-${index}`;
    });

    observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '0px 0px -30% 0px',
      threshold: 0.5,
    });
    headers.value.forEach((header) => {
      const element = document.getElementById(header.id);
      if (element) {
        observer.observe(element);
      }
    });
  }
}


watch(post, (newValue, oldValue) => {
  if (newValue && !oldValue) {
    // Wait for the next tick to ensure the post content is rendered in the DOM
    nextTick(updateTableOfContents);
  }
});

const postHtmlWithVaImg = computed(() => {
  if (!post.value) return "";
  let html = post.value.html;
  // html = html.replaceAll(`<img`, `<van-image `);
  // console.log(html)
  return html;
});

onMounted(async () => {
  await fetchPost();
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>
<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0 auto;
  padding: 0 1rem;
  color: var(--va-text-inverted);
}
article {
  width: 72%;
  margin-left: 20px;
  padding: 1rem;
}
aside {
  width: 28%;
}
.table-of-contents {
  position: sticky;
  cursor: pointer;
  top: 0;
  margin-top: 3rem;
  margin-left: 1rem;
  color: var(--va-text-primary);
  height: 100vh;
  overflow-y: auto;
  padding: 0.5rem;
}
aside li {
  background-color: var(--va-background-secondary);
  font-weight: 300;
  padding: 0.3rem;
  color: var(--va-text-inverted);
  min-height: 2.5rem;
  background-color: #1F262F;
}
aside li.active {
  background-color: var(--va-primary);
  color: var(--va-text-inverted);
  font-weight: 600;
  padding: 0.2rem;
  border: var(--va-background-border);
}
aside li:hover {
  background-color: var(--va-info);
  color: var(--va-text-inverted);
  font-weight: 300;
  padding: 0.2rem;
}
</style>
