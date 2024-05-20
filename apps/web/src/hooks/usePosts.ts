import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Post } from '../features/Posts';
import { httpClient } from '../services/httpClient';

const basicButtonGroupPrefix = 'basicButtonGroup';

export const usePosts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const viewType = searchParams.get('viewType');

  const [toggleIdSelected, setToggleIdSelected] = useState(
    viewType ?? `${basicButtonGroupPrefix}0`
  );

  const [posts, setPosts] = useState<Post[]>([]);

  const toggleButtons = [
    {
      id: `${basicButtonGroupPrefix}0`,
      label: 'JSON',
    },
    {
      id: `${basicButtonGroupPrefix}1`,
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

  return {
    posts,
    toggleButtons,
    toggleIdSelected,
    basicButtonGroupPrefix,

    onChange,
  };
};
