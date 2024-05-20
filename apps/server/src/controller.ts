export const Controller = {
  read: async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments');
    const posts = await res.json();
    return posts;
  },
};
