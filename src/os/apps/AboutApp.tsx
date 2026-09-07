import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import type { ComponentType } from 'react';
import profilePhoto from '../../assets/images/profile-photo.webp';
import { skills, misc } from '../../data/about';
import { AppScroll, Eyebrow, AppTitle, SubMono, Prose, SectionLabel, Chips, Chip } from './appkit';
import RichText from './RichText';

type SizedIcon = ComponentType<{ size?: number; className?: string }>;

const GITHUB = 'https://github.com/RafaelAugustScherer';
const LINKEDIN = 'https://www.linkedin.com/in/rafaelaugustscherer/';
const EMAIL = 'rafaelaugustscherer@gmail.com';

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Photo = styled.img`
  width: 74px;
  height: 74px;
  flex: none;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--cyan-dim);
  box-shadow: 0 0 0 3px rgba(1, 251, 251, 0.08), 0 0 22px rgba(1, 251, 251, 0.2);
`;

const Links = styled.p`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 16px 0 4px;
`;

const Bio = styled(Prose)`
  margin-top: 6px;
  div {
    margin: 0 0 14px;
  }
`;

const Section = styled(SectionLabel)`
  margin-top: 30px;
`;

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
      <Header>
        <Photo src={profilePhoto} alt="Rafael Augusto Scherer" />
        <div>
          <AppTitle>Rafael Augusto Scherer</AppTitle>
          <SubMono>{t('os.about.subtitle')}</SubMono>
        </div>
      </Header>
      <Links>
        <a href={GITHUB} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </Links>
      <Bio>
        <RichText html={t('about.firstParagraph')} />
        <RichText html={t('about.secondParagraph')} />
        <RichText html={t('about.thirdParagraph')} />
      </Bio>
      <Section>{t('os.about.stack')}</Section>
      <Chips>
        {skills.map((skill) => (
          <Chip key={skill.name}>{skill.name}</Chip>
        ))}
      </Chips>
      <Section>{t('os.about.interests')}</Section>
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
