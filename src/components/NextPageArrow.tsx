import * as S from './NextPageArrow.styles';

type NextPageArrowProps = {
  url: string;
};

const NextPageArrow = ({ url }: NextPageArrowProps) => {
  const goToPage = (target: string) => {
    window.location.href = target;
  };

  return (
    <S.ArrowDiv onClick={() => goToPage(url)}>
      <S.Arrow />
      <S.ArrowShadow />
    </S.ArrowDiv>
  );
};

export default NextPageArrow;
