import styled from 'styled-components';
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

const Anchor = styled.a`
  color: var(--text);
  text-decoration: none;

  &:hover {
    color: var(--cyan);
    text-decoration: underline;
  }
`;

const ContactApp = () => (
  <AppScroll>
    <Eyebrow>~/contact</Eyebrow>
    <Grid>
      <IconCell>
        <FaGithub size={15} />
      </IconCell>
      <Label>github</Label>
      <Value>
        <Anchor href="https://github.com/RafaelAugustScherer" target="_blank" rel="noopener noreferrer">
          RafaelAugustScherer
        </Anchor>
      </Value>

      <IconCell>
        <FaLinkedin size={15} />
      </IconCell>
      <Label>linkedin</Label>
      <Value>
        <Anchor
          href="https://www.linkedin.com/in/rafael-augusto-scherer/"
          target="_blank"
          rel="noopener noreferrer"
        >
          rafael-augusto-scherer
        </Anchor>
      </Value>

      <IconCell>
        <Mail size={15} />
      </IconCell>
      <Label>email</Label>
      <Value>
        <Anchor href="mailto:rafaelaugustscherer@gmail.com" target="_blank" rel="noopener noreferrer">
          rafaelaugustscherer@gmail.com
        </Anchor>
      </Value>

      <IconCell>
        <MapPin size={15} />
      </IconCell>
      <Label>location</Label>
      <Value>Rio Grande do Sul, Brazil</Value>
    </Grid>
  </AppScroll>
);

export default ContactApp;
