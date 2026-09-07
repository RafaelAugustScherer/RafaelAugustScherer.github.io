import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Mail, MapPin } from 'lucide-react';
import { AppScroll, Eyebrow } from './appkit';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 20px auto 1fr;
  align-items: center;
  gap: 10px 14px;
  font-family: var(--mono);
  font-size: 12.5px;
`;

const IconCell = styled.span`
  display: flex;
  align-items: center;
  color: var(--cyan);
`;

const Label = styled.span`
  color: var(--text-faint);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 10.5px;
`;

const Value = styled.span`
  color: var(--text-dim);
`;

const ContactApp = () => {
  const { t } = useTranslation();
  return (
  <AppScroll>
    <Eyebrow>~/contact</Eyebrow>
    <Grid>
      <IconCell>
        <FaGithub size={15} />
      </IconCell>
      <Label>github</Label>
      <Value>
        <a href="https://github.com/RafaelAugustScherer" target="_blank" rel="noopener noreferrer">
          RafaelAugustScherer
        </a>
      </Value>

      <IconCell>
        <FaLinkedin size={15} />
      </IconCell>
      <Label>linkedin</Label>
      <Value>
        <a
          href="https://www.linkedin.com/in/rafaelaugustscherer/"
          target="_blank"
          rel="noopener noreferrer"
        >
          rafaelaugustscherer
        </a>
      </Value>

      <IconCell>
        <Mail size={15} />
      </IconCell>
      <Label>email</Label>
      <Value>
        <a href="mailto:rafaelaugustscherer@gmail.com">rafaelaugustscherer@gmail.com</a>
      </Value>

      <IconCell>
        <MapPin size={15} />
      </IconCell>
      <Label>{t('os.contact.location')}</Label>
      <Value>Brazil</Value>
    </Grid>
  </AppScroll>
  );
};

export default ContactApp;
