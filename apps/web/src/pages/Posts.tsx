import { EuiButtonGroup } from '@elastic/eui';

import { PostsTable } from '../features/PostsTable';
import { usePosts } from '../hooks/usePosts';
import { Loader } from '../components/Loader';

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
    isLoading,
    onChange,
  } = usePosts();

  if (isLoading) {
    return (
      <>
        <EuiButtonGroup
          legend={'View display settings'}
          idSelected={toggleIdSelected}
          options={toggleButtons}
          onChange={onChange}
        />
        <Loader />
      </>
    );
  }

  return (
    <>
      <EuiButtonGroup
        legend={'View display settings'}
        idSelected={toggleIdSelected}
        options={toggleButtons}
        onChange={onChange}
      />
      {toggleIdSelected === `${basicButtonGroupPrefix}1` ? (
        <PostsTable posts={posts} />
      ) : (
        <pre>{JSON.stringify([posts], null, 2)}</pre>
      )}
    </>
  );
};
