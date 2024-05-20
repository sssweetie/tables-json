import { EuiButtonGroup } from '@elastic/eui';

import { PostsTable } from './PostsTable';
import { usePosts } from '../hooks/usePosts';

export interface Post {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const Posts = () => {
  const {
    toggleIdSelected,
    toggleButtons,
    basicButtonGroupPrefix,
    posts,
    onChange,
  } = usePosts();

  return (
    <>
      <EuiButtonGroup
        legend={'View display settings'}
        idSelected={toggleIdSelected}
        onChange={onChange}
        options={toggleButtons}
      />
      {toggleIdSelected === `${basicButtonGroupPrefix}1` ? (
        <PostsTable posts={posts} />
      ) : (
        <pre>{JSON.stringify([posts], null, 2)}</pre>
      )}
    </>
  );
};
