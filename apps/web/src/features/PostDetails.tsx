import { Link, NavigateFunction } from 'react-router-dom';
import * as S from './styled';
import { Post } from '../pages/Posts';
import { FC } from 'react';

interface PostDetailsProps {
  post: Post;
  navigate: NavigateFunction;
}

export const PostDetails: FC<PostDetailsProps> = ({ post, navigate }) => {
  const pairs = Object.entries(post);

  return (
    <S.DetailsContainer>
      {pairs.map((pair) => {
        const [key, value] = pair;
        return (
          <S.KeyValue key={key}>
            <S.Key>{key}</S.Key>
            <S.Value>
              <Link
                to={'..'}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(-1);
                }}
              >
                {value}
              </Link>
            </S.Value>
          </S.KeyValue>
        );
      })}
    </S.DetailsContainer>
  );
};
