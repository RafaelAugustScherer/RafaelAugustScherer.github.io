import { useMemo } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Play } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import projectsData from '../../data/projects';
import { useOS } from '../osStore';
import { AppScroll, Eyebrow } from './appkit';

const Grid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 13px 15px;
  border: 1px solid var(--line);
  background: var(--surface-2);
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  strong { font-family: var(--ui); font-size: 14px; font-weight: 600; color: var(--text); }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const Tag = styled.span`
  font-family: var(--mono);
  font-size: 10px;
  padding: 2px 7px;
  border: 1px solid var(--line);
  color: var(--text-dim);
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 2px;
`;

const Run = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--ui);
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  color: var(--cyan);
  border: 1px solid var(--cyan-dim);
  background: rgba(1, 251, 251, 0.08);
  &:hover { background: var(--cyan); color: #04121a; }
`;

const Link = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: var(--mono);
  font-size: 11px;
  color: var(--text-dim);
  padding: 6px 8px;
  &:hover { color: var(--cyan); text-decoration: none; }
`;

const ProjectsApp = () => {
  const { t } = useTranslation();
  const { openBrowser } = useOS();
  const projects = useMemo(() => projectsData(t), [t]);

  return (
    <AppScroll>
      <Eyebrow>~/projects — double-click Run to launch in the Browser</Eyebrow>
      <Grid>
        {projects.map((p) => (
          <Card key={p.dir}>
            <Head>
              <strong>{p.name}</strong>
            </Head>
            <Tags>
              {p.badges.map((b) => (
                <Tag key={b}>{b}</Tag>
              ))}
            </Tags>
            <Actions>
              <Run onClick={() => openBrowser(p.website)}>
                <Play size={13} /> Run
              </Run>
              <Link href={p.repository} target="_blank" rel="noopener noreferrer">
                <FaGithub size={13} /> Source
              </Link>
              <Link href={p.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={13} /> Live
              </Link>
            </Actions>
          </Card>
        ))}
      </Grid>
    </AppScroll>
  );
};

export default ProjectsApp;
