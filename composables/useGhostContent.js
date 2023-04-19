import GhostContentAPI from "@tryghost/content-api";

export default function useGhostContent() {
  const api = new GhostContentAPI({
    url: "https://standwithfreedom.org",
    key: "77b912934707b85f82f8399be9",
    version: "v5.0",
  });

  async function getPosts(options = {}) {
    return await api.posts.browse(options).catch((err) => {
      console.error(err);
    });
  }

  async function getPost(options = {}) {
    return await api.posts.read(options).catch((err) => {
      console.error(err);
    });
  }

  async function getAuthors(options = {}) {
    return await api.authors.browse(options).catch((err) => {
      console.error(err);
    });
  }

  async function getAuthor(options = {}) {
    return await api.authors.read(options).catch((err) => {
      console.error(err);
    });
  }

  async function getTags(options = {}) {
    return await api.tags.browse(options).catch((err) => {
      console.error(err);
    });
  }

  async function getTag(options = {}) {
    return await api.tags.read(options).catch((err) => {
      console.error(err);
    });
  }

  async function getPages(options = {}) {
    return await api.pages.browse(options).catch((err) => {
      console.error(err);
    });
  }

  async function getPage(options = {}) {
    return await api.pages.read(options).catch((err) => {
      console.error(err);
    });
  }

  async function getSettings() {
    return await api.settings.browse().catch((err) => {
      console.error(err);
    });
  }

  return {
    getPosts,
    getPost,
    getAuthors,
    getAuthor,
    getTags,
    getTag,
    getPages,
    getPage,
    getSettings,
  };
}
