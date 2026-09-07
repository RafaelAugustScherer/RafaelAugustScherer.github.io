import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useOS } from '../osContext';
import { AppScroll, Eyebrow, AppTitle, Prose } from './appkit';
import RichText from './RichText';

const Intro = styled(Prose)`
  div {
    margin: 0 0 12px;
    font-size: 14px;
    line-height: 1.66;
    color: var(--text-dim);
    max-width: 60ch;
  }
`;

const Actions = styled.p`
  margin: 18px 0 0;
`;

const Hint = styled.p`
  font-family: var(--mono);
  font-size: 11px;
  color: var(--text-faint);
  margin: 16px 0 0;
`;

const WelcomeApp = () => {
  const { t } = useTranslation();
  const { open } = useOS();

  return (
    <AppScroll>
      <Eyebrow>{t('os.welcome.eyebrow')}</Eyebrow>
      <AppTitle>{t('os.welcome.title')}</AppTitle>
      <Intro>
        <RichText html={t('os.welcome.intro')} />
        <RichText html={t('os.welcome.meIntro')} />
      </Intro>
      <Actions>
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            open('about');
          }}
        >
          {t('os.welcome.cta')}
        </a>
      </Actions>
      <Hint>{t('os.welcome.hint')}</Hint>
    </AppScroll>
  );
};

export default WelcomeApp;
