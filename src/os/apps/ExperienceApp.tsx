import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';
import { academicExperience, professionalExperience } from '../../data/experience';
import { AppScroll, Eyebrow, SectionLabel, Prose } from './appkit';
import RichText from './RichText';

const Card = styled.div`
  display: flex;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid var(--line-soft);

  &:last-child {
    border-bottom: none;
  }
`;

const Icon = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
`;

const Body = styled.div`
  flex: 1;
  min-width: 0;
`;

const Name = styled.p`
  font-family: var(--ui);
  font-size: 13.5px;
  color: var(--text);
  margin: 0 0 2px;
`;

const DateLabel = styled.p`
  font-family: var(--mono);
  font-size: 10.5px;
  color: var(--magenta);
  margin: 0 0 8px;
`;

const EntryProse = styled(Prose)`
  p {
    font-size: 12.5px;
  }
`;

interface Entry {
  name: string;
  tKey: string;
  date: string;
  icon: string;
}

const ExperienceApp: FC = () => {
  const { t } = useTranslation();

  const renderEntries = (entries: Entry[]) =>
    entries.map((entry) => {
      const paragraphs = t(`experience.${entry.tKey}`, { returnObjects: true }) as string[];
      return (
        <Card key={entry.name}>
          <Icon src={entry.icon} alt={entry.name} />
          <Body>
            <Name>{entry.name}</Name>
            <DateLabel>{entry.date}</DateLabel>
            <EntryProse>
              {paragraphs.map((paragraph, index) => (
                <RichText key={index} html={paragraph} />
              ))}
            </EntryProse>
          </Body>
        </Card>
      );
    });

  return (
    <AppScroll>
      <Eyebrow>~/experience</Eyebrow>
      <SectionLabel>Professional</SectionLabel>
      {renderEntries(professionalExperience)}
      <SectionLabel>Academic</SectionLabel>
      {renderEntries(academicExperience)}
    </AppScroll>
  );
};

export default ExperienceApp;
