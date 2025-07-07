import { usePostsStore, type Post } from "~/stores/posts";

export function useFetchPosts() {
  const store = usePostsStore();
  const { data } = useFetch<Post[]>("/api/posts");
  watch(data, (val) => {
    if (val) store.setPosts(val);
  });
  return { posts: store.posts };
}
