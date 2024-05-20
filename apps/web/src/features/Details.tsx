import { useEffect, useState } from 'react';
import { httpClient } from '../services/httpClient';
import { Post } from './Posts';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EuiTitle } from '@elastic/eui';
import { DetailsContainer, Key, KeyValue, Value } from './styled';

export const Details = () => {
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

  return (
    <div style={{ padding: '32px' }}>
      <EuiTitle size="l">
        <h1>Post details</h1>
      </EuiTitle>
      {post !== null && (
        <DetailsContainer>
          {Object.entries(post).map((pair) => {
            const [key, value] = pair;
            return (
              <KeyValue key={key}>
                <Key>{key}</Key>
                <Value>
                  <Link
                    to={'..'}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(-1);
                    }}
                  >
                    {value}
                  </Link>
                </Value>
              </KeyValue>
            );
          })}
        </DetailsContainer>
      )}
    </div>
  );
};
