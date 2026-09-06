import Badge from './Badge';
import * as S from './style/BadgeSet.styles';

type BadgeSetProps = {
  badges: string[];
  section: string;
};

const BadgeSet = ({ badges, section }: BadgeSetProps) => {
  return (
    <S.BadgeSetDiv>
      {badges.map((badgeName) => (
        <Badge key={`${badgeName}-${section}`} badgeName={badgeName} />
      ))}
    </S.BadgeSetDiv>
  );
};

export default BadgeSet;
