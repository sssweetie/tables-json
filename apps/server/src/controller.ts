const JSON_URL = 'https://jsonplaceholder.typicode.com/comments';

export const Controller = {
  getPosts: async () => {
    const res = await fetch(JSON_URL);
    const posts = await res.json();
    return posts;
  },

  getPost: async (id: string) => {
    const res = await fetch(`${JSON_URL}/${id}`);
    const post = await res.json();
    return post;
  },
};
