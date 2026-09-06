import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import type { ComponentType } from 'react';
import { skills, misc } from '../../data/about';
import { AppScroll, Eyebrow, AppTitle, SubMono, Prose, SectionLabel, Chips, Chip } from './appkit';
import RichText from './RichText';

type SizedIcon = ComponentType<{ size?: number; className?: string }>;

const MiscRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
`;

const MiscItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--mono);
  font-size: 11px;
  color: var(--text-dim);
`;

const AboutApp = () => {
  const { t } = useTranslation();

  return (
    <AppScroll>
      <Eyebrow>~/about.md</Eyebrow>
      <AppTitle>Rafael Augusto Scherer</AppTitle>
      <SubMono>Systems Analyst · Rio Grande do Sul, Brazil</SubMono>
      <Prose>
        <RichText html={t('about.firstParagraph')} />
        <RichText html={t('about.secondParagraph')} />
        <RichText html={t('about.thirdParagraph')} />
      </Prose>
      <SectionLabel>Stack</SectionLabel>
      <Chips>
        {skills.map((skill) => (
          <Chip key={skill.name}>{skill.name}</Chip>
        ))}
      </Chips>
      <SectionLabel>Interests</SectionLabel>
      <MiscRow>
        {misc.map((item) => {
          const Icon = item.icon as SizedIcon;
          return (
            <MiscItem key={item.name}>
              <Icon size={14} />
              {item.name}
            </MiscItem>
          );
        })}
      </MiscRow>
    </AppScroll>
  );
};

export default AboutApp;
