import badges from '../../data/badges';
import * as S from './style/Badge.styles';

type BadgeProps = {
  badgeName: string;
};

const Badge = ({ badgeName }: BadgeProps) => {
  const badgeObj = badges.find(({ name }) => name === badgeName);

  return (
    <S.BadgeImg
      src={badgeObj!.src}
      alt={`${badgeName} Logo`}
      loading="lazy"
      decoding="async"
    />
  );
};

export default Badge;
