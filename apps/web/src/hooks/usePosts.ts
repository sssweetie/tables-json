import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Post } from '../pages/Posts';
import { httpClient } from '../services/httpClient';

const basicButtonGroupPrefix = 'basicButtonGroup';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const viewType = searchParams.get('viewType');

  const [toggleIdSelected, setToggleIdSelected] = useState(
    viewType ?? `${basicButtonGroupPrefix}0`
  );

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
      try {
        setIsLoading(true);
        const res = await httpClient.get('/posts');
        setPosts(res.data);
      } catch (err) {
        alert(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    posts,
    toggleButtons,
    toggleIdSelected,
    basicButtonGroupPrefix,
    isLoading,
    onChange,
  };
};
