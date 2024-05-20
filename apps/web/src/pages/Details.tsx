import { EuiTitle } from '@elastic/eui';
import { PostDetails } from '../features/PostDetails';
import { useDetails } from '../hooks/useDetails';
import { Loader } from '../components/Loader';

export const Details = () => {
  const { post, isLoading, navigate } = useDetails();

  if (isLoading) {
    return (
      <div style={{ padding: '32px' }}>
        <EuiTitle size="l">
          <h1 style={{ marginBottom: '16px' }}>Post details</h1>
        </EuiTitle>
        <Loader />
      </div>
    );
  }

  return (
    <div style={{ padding: '32px' }}>
      <EuiTitle size="l">
        <h1 style={{ marginBottom: '16px' }}>Post details</h1>
      </EuiTitle>

      {post !== null && <PostDetails post={post} navigate={navigate} />}
    </div>
  );
};
