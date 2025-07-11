/*
import { createServer, Model, Response } from "miragejs";

export default defineNuxtPlugin(() => {
  if (process.dev) {
    createServer({
      models: { post: Model },
      seeds(server) {
        let initialPosts = [];
        if (typeof window !== "undefined") {
          const saved = localStorage.getItem("mirage-posts");
          if (saved) {
            initialPosts = JSON.parse(saved);
          }
        }
        if (!initialPosts.length) {
          initialPosts = [
            { id: "1", title: "Primeiro Post", body: "Conteúdo do primeiro post." },
            { id: "2", title: "Segundo Post", body: "Conteúdo do segundo post." },
            { id: "3", title: "Terceiro Post", body: "Conteúdo do terceiro post." },
            { id: "4", title: "Quarto Post", body: "Conteúdo do quarto post." },
            { id: "5", title: "Quinto Post", body: "Conteúdo do quinto post." },
            { id: "6", title: "Sexto Post", body: "Conteúdo do sexto post." },
          ];
        }
        initialPosts.forEach((post: any) => server.create("post", post));
      },
      routes() {
        this.namespace = "api";
        this.passthrough((request) => !request.url.startsWith("/api"));

        this.get("/posts", (schema) => {
          if (typeof window !== "undefined") {
            const saved = localStorage.getItem("mirage-posts");
            if (saved) {
              return { posts: JSON.parse(saved) };
            }
          }
          return schema.all("post");
        });

        this.post("/posts", (schema, request) => {
          const attrs = JSON.parse(request.requestBody);
          attrs.id = Date.now().toString();
          const post = schema.create("post", attrs);

          // Salva no localStorage se estiver no client
          if (typeof window !== "undefined") {
            const allPosts = schema.all("post").models.map((m) => m.attrs);
            localStorage.setItem("mirage-posts", JSON.stringify(allPosts));
          }
          return post;
        });

        this.put("/posts/:id", (schema, request) => {
          const id = request.params.id;
          const attrs = JSON.parse(request.requestBody);
          const post = schema.find("post", id);
          if (!post) return { error: "Post não encontrado" };
          post.update(attrs);
          // Salva no localStorage se estiver no client
          if (typeof window !== "undefined") {
            const allPosts = schema.all("post").models.map((m) => m.attrs);
            localStorage.setItem("mirage-posts", JSON.stringify(allPosts));
          }
          return post;
        });

        this.get("/posts/:id", (schema, request) =>
          schema.find("post", request.params.id)
        );
      },
    });
  }
});
*/
