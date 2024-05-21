import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Post } from '../pages/Posts';
import { httpClient } from '../services/httpClient';

export const useDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await httpClient.get(`/posts/details/${id}`);
        setPost(res.data);
      } catch (err) {
        alert(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { post, isLoading, navigate };
};
