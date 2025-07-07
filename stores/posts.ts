import { defineStore } from "pinia";

export interface Post {
  id: number | string;
  title: string;
  body: string;
  image?: string;
}

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: [] as Post[],
  }),
  actions: {
    setPosts(data: Post[]) {
      this.posts = data;
    },
    addPost(post: Post) {
      this.posts.push(post);
    },
  },
});
