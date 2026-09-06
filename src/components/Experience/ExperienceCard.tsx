import { Trans, useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import * as S from './style/ExperienceCard.styles';

type ExperienceCardProps = {
  name: string;
  tKey: string;
  date: string;
  icon: string;
  index: number;
};

const ExperienceCard = ({ name, tKey, date, icon, index }: ExperienceCardProps) => {
  const { t } = useTranslation();
  const [isToggled, setIsToggled] = useState(false);

  const [paragraphs, setParagraphs] = useState<string[]>([]);

  useEffect(() => {
    const newParagraphs: string[] = [];
    (t(`experience.${tKey}`, { returnObjects: true }) as string[]).map((p) => {
      newParagraphs.push(p);
    });
    setParagraphs(newParagraphs);
  }, [t]);

  useEffect(() => {
    if (isToggled) {
      const originalParagraphs = [...paragraphs];

      const scrambleInterval = setInterval(scrambleParagraphs, 100);
      setTimeout(() => {
        clearInterval(scrambleInterval);
        setParagraphs(originalParagraphs);
      }, 750);
    }
  }, [isToggled]);

  const scrambleChar = (char: string) => {
    if (char === ' ') return ' ';
    if (Math.random() > 0.5) return char;
    return Math.random() > 0.5 ? '0' : '1';
  };

  const scrambleParagraphs = async () => {
    setParagraphs(
      paragraphs.map((p) => p.split('').map(scrambleChar).join(''))
    );
  };

  return (
    <S.ExperienceItem
      key={`${name}-experience`}
      onClick={() => setIsToggled(!isToggled)}
      data-aos="fade-down" data-aos-duration={index * 1250}
    >
      <S.ItemTitle>
      <S.ItemArrow $toggle={isToggled} />
      <S.ItemIcon
        src={icon}
        alt={`${name} logo`}
        loading="lazy"
        decoding="async"
      />
      <span>{name}</span>
      &nbsp;
      <span>({date})</span>
      </S.ItemTitle>
      <S.ItemTextDiv $toggle={isToggled}>
        {
          paragraphs.map((p, idx) => (
            <S.ItemText
              key={`${name}-${idx}`}
            >
              <Trans>{p}</Trans>
            </S.ItemText>
          ))
        }
      </S.ItemTextDiv>
    </S.ExperienceItem>
  );
};

export default ExperienceCard;
