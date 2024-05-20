import { EuiTitle } from '@elastic/eui';
import { PostDetails } from '../features/PostDetails';
import { useDetails } from '../hooks/useDetails';

export const Details = () => {
  const { post, navigate } = useDetails();

  return (
    <div style={{ padding: '32px' }}>
      <EuiTitle size="l">
        <h1>Post details</h1>
      </EuiTitle>
      {post !== null && <PostDetails post={post} navigate={navigate} />}
    </div>
  );
};
