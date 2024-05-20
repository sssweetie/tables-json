import { EuiButtonGroup, useGeneratedHtmlId } from '@elastic/eui';

import { useEffect, useState } from 'react';
import { httpClient } from '../services/httpClient';
import { PostsTable } from './PostsTable';

export interface Post {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const Posts = () => {
  const basicButtonGroupPrefix = useGeneratedHtmlId({
    prefix: 'basicButtonGroup',
  });

  const [toggleIdSelected, setToggleIdSelected] = useState(
    `${basicButtonGroupPrefix}__0`
  );

  const [posts, setPosts] = useState<Post[]>([]);

  const toggleButtons = [
    {
      id: `${basicButtonGroupPrefix}__0`,
      label: 'JSON',
    },
    {
      id: `${basicButtonGroupPrefix}__1`,
      label: 'Tables',
    },
  ];

  const onChange = (optionId: string) => {
    setToggleIdSelected(optionId);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await httpClient.get('/posts');
      setPosts(res.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <EuiButtonGroup
        legend={'View display settings'}
        idSelected={toggleIdSelected}
        onChange={onChange}
        options={toggleButtons}
      />
      {toggleIdSelected === `${basicButtonGroupPrefix}__1` ? (
        <PostsTable posts={posts} />
      ) : (
        <div>{posts.length > 0 && JSON.stringify(posts)}</div>
      )}
    </>
  );
};
