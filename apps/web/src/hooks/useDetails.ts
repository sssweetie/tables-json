import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Post } from '../features/Posts';
import { httpClient } from '../services/httpClient';

export const useDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await httpClient.get(`/posts/details/${id}`);
      setPost(res.data);
    };

    fetchData();
  }, []);

  return { post, navigate };
};
