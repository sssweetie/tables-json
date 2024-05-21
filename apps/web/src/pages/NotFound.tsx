import { EuiCard, EuiIcon } from '@elastic/eui';
import { useNavigate } from 'react-router-dom';
import { NotFoundWrapper } from './styled';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <NotFoundWrapper>
      <EuiCard
        icon={<EuiIcon type="error" size="xxl" />}
        title="404"
        description="Page not found :("
        onClick={() => navigate('/')}
      />
    </NotFoundWrapper>
  );
};
