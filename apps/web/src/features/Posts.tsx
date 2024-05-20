import { EuiButtonGroup, useGeneratedHtmlId } from '@elastic/eui';

import { useEffect, useState } from 'react';
import { httpClient } from '../services/httpClient';
import { PostsTable } from './PostsTable';
import { useSearchParams } from 'react-router-dom';

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

  const [searchParams, setSearchParams] = useSearchParams();

  const viewType = searchParams.get('viewType');

  const [toggleIdSelected, setToggleIdSelected] = useState(
    viewType ?? `${basicButtonGroupPrefix}__0`
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
    searchParams.set('viewType', optionId);
    setSearchParams(searchParams);
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
        <div>
          <pre>{JSON.stringify([posts], null, 2)}</pre>
        </div>
      )}
    </>
  );
};
