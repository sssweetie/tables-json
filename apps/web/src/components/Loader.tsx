import { EuiLoadingSpinner } from '@elastic/eui';
import * as S from '../pages/styled';

export const Loader = () => {
  return (
    <S.LoadingWrapper>
      <EuiLoadingSpinner size="xl" />
    </S.LoadingWrapper>
  );
};
