import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Mail, MapPin } from 'lucide-react';
import profilePhoto from '../assets/images/profile-photo.webp';
import { skills, misc } from '../data/about';
import { academicExperience, professionalExperience } from '../data/experience';
import projectsData from '../data/projects';
import RichText from '../os/apps/RichText';
import { Prose, Chips, Chip } from '../os/apps/appkit';

const EMAIL = 'rafaelaugustscherer@gmail.com';
const GITHUB = 'https://github.com/RafaelAugustScherer';
const LINKEDIN = 'https://www.linkedin.com/in/rafaelaugustscherer/';

const Page = styled.div`
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  color: var(--text);
`;

const Bg = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  background: radial-gradient(120% 60% at 50% 0%, #2a0b46 0%, #12082a 42%, var(--ground) 78%);
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.14) 0 1px, transparent 1px 3px);
  }
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  background: rgba(11, 9, 18, 0.82);
  backdrop-filter: blur(9px);
  border-bottom: 1px solid var(--line-soft);
  .mark {
    font-family: var(--ui);
    font-weight: 700;
    letter-spacing: 0.06em;
    color: var(--cyan);
    text-shadow: 0 0 10px rgba(1, 251, 251, 0.5);
  }
`;

const Lang = styled.div`
  display: flex;
  border: 1px solid var(--line);
  button {
    padding: 3px 9px;
    font-family: var(--mono);
    font-size: 11px;
    color: var(--text-faint);
  }
  button[aria-pressed='true'] {
    background: var(--cyan);
    color: #04121a;
    font-weight: 600;
  }
`;

const Main = styled.main`
  max-width: 620px;
  margin: 0 auto;
  padding: 0 20px 64px;
`;

const Hero = styled.section`
  padding: 40px 0 30px;
  text-align: center;
  .photo {
    width: 116px;
    height: 116px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid var(--cyan-dim);
    box-shadow: 0 0 0 4px rgba(1, 251, 251, 0.08), 0 0 34px rgba(1, 251, 251, 0.22);
  }
  h1 {
    font-family: var(--ui);
    font-size: 26px;
    font-weight: 700;
    letter-spacing: 0.01em;
    margin: 18px 0 6px;
    text-wrap: balance;
  }
  .role {
    font-family: var(--mono);
    font-size: 12px;
    color: var(--cyan);
    margin: 0 0 12px;
  }
  .tagline {
    font-size: 15px;
    line-height: 1.6;
    color: var(--text-dim);
    max-width: 42ch;
    margin: 0 auto;
    text-wrap: balance;
  }
`;

const HeroLinks = styled.p`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 18px;
  margin: 22px 0 0;
`;

const Section = styled.section`
  padding: 26px 0;
  border-top: 1px solid var(--line-soft);
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  &.in {
    opacity: 1;
    transform: none;
  }
  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    transition: none;
  }
`;

const Eyebrow = styled.p`
  font-family: var(--mono);
  font-size: 10.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--magenta);
  margin: 0 0 16px;
`;

const Entry = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 0;
  & + & {
    border-top: 1px solid var(--line-soft);
  }
  img {
    width: 38px;
    height: 38px;
    border-radius: 8px;
    object-fit: cover;
    flex-shrink: 0;
  }
  .name {
    font-family: var(--ui);
    font-size: 14px;
    color: var(--text);
    margin: 0 0 2px;
  }
  .date {
    font-family: var(--mono);
    font-size: 10.5px;
    color: var(--magenta);
    margin: 0 0 8px;
  }
  p.body {
    font-size: 13px;
  }
`;

const SubLabel = styled.h3`
  font-family: var(--ui);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--cyan);
  font-weight: 600;
  margin: 18px 0 6px;
`;

const ProjectItem = styled.div`
  padding: 14px 0;
  & + & {
    border-top: 1px solid var(--line-soft);
  }
  strong {
    font-family: var(--ui);
    font-size: 15px;
    font-weight: 600;
    color: var(--text);
  }
  .blurb {
    font-size: 13px;
    line-height: 1.6;
    color: var(--text-dim);
    margin: 8px 0 0;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
`;

const Tag = styled.span`
  font-family: var(--mono);
  font-size: 10px;
  padding: 2px 7px;
  border: 1px solid var(--line);
  color: var(--text-dim);
`;

const ProjectLinks = styled.p`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 12px 0 0;
  font-family: var(--mono);
  font-size: 12.5px;
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  font-family: var(--mono);
  font-size: 13px;
  .row {
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }
  .loc {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: var(--text-dim);
  }
  svg {
    color: var(--cyan);
    flex: none;
  }
`;

const Footer = styled.footer`
  margin-top: 36px;
  padding-top: 20px;
  border-top: 1px solid var(--line-soft);
  text-align: center;
  font-family: var(--mono);
  font-size: 10.5px;
  color: var(--text-faint);
  line-height: 1.7;
`;

const useReveal = () => {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
};

const RevealSection = ({ label, children }: { label: string; children: ReactNode }) => {
  const ref = useReveal();
  return (
    <Section ref={ref}>
      <Eyebrow>{label}</Eyebrow>
      {children}
    </Section>
  );
};

interface ExpEntry {
  name: string;
  tKey: string;
  date: string;
  icon: string;
}

const MobilePortfolio = () => {
  const { t, i18n } = useTranslation();
  const projects = projectsData(t);
  const lang = i18n.resolvedLanguage === 'pt' ? 'pt' : 'en';

  const renderEntries = (entries: ExpEntry[]) =>
    entries.map((entry) => {
      const paragraphs = t(`experience.${entry.tKey}`, { returnObjects: true }) as string[];
      return (
        <Entry key={entry.name}>
          <img src={entry.icon} alt={entry.name} />
          <div>
            <p className="name">{entry.name}</p>
            <p className="date">{entry.date}</p>
            <Prose>
              {paragraphs.map((p, i) => (
                <RichText key={i} html={p} />
              ))}
            </Prose>
          </div>
        </Entry>
      );
    });

  return (
    <Page>
      <Bg />
      <Header>
        <span className="mark">Rafael Scherer</span>
        <Lang>
          <button aria-pressed={lang === 'en'} onClick={() => i18n.changeLanguage('en')}>
            EN
          </button>
          <button aria-pressed={lang === 'pt'} onClick={() => i18n.changeLanguage('pt')}>
            PT
          </button>
        </Lang>
      </Header>

      <Main>
        <Hero>
          <img className="photo" src={profilePhoto} alt="Rafael Augusto Scherer" />
          <h1>Rafael Augusto Scherer</h1>
          <p className="role">{t('os.about.subtitle')}</p>
          <p className="tagline">{t('os.about.tagline')}</p>
          <HeroLinks>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={`mailto:${EMAIL}`}>Email</a>
          </HeroLinks>
        </Hero>

        <RevealSection label="~/about.md">
          <Prose>
            <RichText html={t('about.firstParagraph')} />
            <RichText html={t('about.secondParagraph')} />
            <RichText html={t('about.thirdParagraph')} />
          </Prose>
          <SubLabel>{t('os.about.stack')}</SubLabel>
          <Chips>
            {skills.map((s) => (
              <Chip key={s.name}>{s.name}</Chip>
            ))}
          </Chips>
          <SubLabel>{t('os.about.interests')}</SubLabel>
          <Chips>
            {misc.map((m) => (
              <Chip key={m.name}>{m.name}</Chip>
            ))}
          </Chips>
        </RevealSection>

        <RevealSection label="~/experience">
          <SubLabel>{t('os.experience.professional')}</SubLabel>
          {renderEntries(professionalExperience)}
          <SubLabel>{t('os.experience.academic')}</SubLabel>
          {renderEntries(academicExperience)}
        </RevealSection>

        <RevealSection label="~/projects">
          {projects.map((p) => (
            <ProjectItem key={p.id}>
              <strong>{p.name}</strong>
              <p className="blurb">{p.blurb}</p>
              <Tags>
                {p.tech.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Tags>
              <ProjectLinks>
                {p.website && (
                  <a href={p.website} target="_blank" rel="noopener noreferrer">
                    {t('os.projects.openWeb')}
                  </a>
                )}
                <a href={p.repository} target="_blank" rel="noopener noreferrer">
                  {t('os.projects.source')}
                </a>
              </ProjectLinks>
            </ProjectItem>
          ))}
        </RevealSection>

        <RevealSection label="~/contact">
          <ContactList>
            <span className="row">
              <Mail size={16} /> <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </span>
            <span className="row">
              <FaGithub size={16} />{' '}
              <a href={GITHUB} target="_blank" rel="noopener noreferrer">
                RafaelAugustScherer
              </a>
            </span>
            <span className="row">
              <FaLinkedin size={16} />{' '}
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                rafaelaugustscherer
              </a>
            </span>
            <span className="loc">
              <MapPin size={16} /> Brazil
            </span>
          </ContactList>
        </RevealSection>

        <Footer>Rafael Scherer — {new Date().getFullYear()}</Footer>
      </Main>
    </Page>
  );
};

export default MobilePortfolio;
