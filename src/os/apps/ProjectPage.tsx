import { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { projectById } from '../../data/projects';

const Scroll = styled.div`
  height: 100%;
  overflow: auto;
  background: radial-gradient(120% 90% at 50% 0%, #1a1136 0%, var(--ground) 70%);
`;

const Inner = styled.div`
  max-width: 640px;
  margin: 0 auto;
  padding: 30px 26px 40px;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconTile = styled.div`
  width: 64px;
  height: 64px;
  flex: none;
  display: grid;
  place-items: center;
  border: 1px solid var(--cyan-dim);
  background: linear-gradient(135deg, var(--surface-3), var(--surface));
  box-shadow: inset 0 0 18px rgba(1, 251, 251, 0.14);
  img {
    width: 52px;
    height: 52px;
    mix-blend-mode: screen;
  }
`;

const Title = styled.h1`
  font-family: var(--ui);
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.01em;
  margin: 0 0 8px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Tag = styled.span`
  font-family: var(--mono);
  font-size: 10.5px;
  padding: 2px 8px;
  border: 1px solid var(--line);
  color: var(--text-dim);
  background: var(--surface-2);
`;

const Gallery = styled.div`
  margin: 22px 0;
`;

const Stage = styled.div`
  position: relative;
  aspect-ratio: 16 / 10;
  border: 1px solid var(--line);
  background: #05040a;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(1, 251, 251, 0.08);
  overflow: hidden;
  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Arrow = styled.button<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $side }) => ($side === 'left' ? 'left: 8px;' : 'right: 8px;')}
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  color: var(--text);
  background: rgba(5, 4, 10, 0.55);
  border: 1px solid var(--line);
  backdrop-filter: blur(3px);
  &:hover {
    color: var(--cyan);
    border-color: var(--cyan-dim);
    background: rgba(5, 4, 10, 0.75);
  }
`;

const Count = styled.span`
  position: absolute;
  right: 8px;
  bottom: 8px;
  font-family: var(--mono);
  font-size: 10.5px;
  color: var(--text);
  background: rgba(5, 4, 10, 0.6);
  border: 1px solid var(--line);
  padding: 2px 7px;
`;

const Thumbs = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
  overflow-x: auto;
  padding-bottom: 2px;
`;

const Thumb = styled.button<{ $active: boolean }>`
  flex: none;
  width: 88px;
  aspect-ratio: 16 / 10;
  padding: 0;
  border: 1px solid ${({ $active }) => ($active ? 'var(--cyan)' : 'var(--line)')};
  opacity: ${({ $active }) => ($active ? 1 : 0.55)};
  box-shadow: ${({ $active }) => ($active ? '0 0 0 1px var(--cyan-dim)' : 'none')};
  overflow: hidden;
  &:hover {
    opacity: 1;
    border-color: var(--cyan-dim);
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Blurb = styled.p`
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-dim);
  margin: 20px 0 0;
`;

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
`;

const NoLive = styled.p`
  font-family: var(--mono);
  font-size: 11px;
  color: var(--text-faint);
  margin: 12px 0 0;
`;

const Missing = styled.div`
  padding: 40px;
  text-align: center;
  font-family: var(--mono);
  color: var(--text-faint);
`;

const ProjectPage = ({ id }: { id: string }) => {
  const { t } = useTranslation();
  const project = projectById(t, id);
  const [active, setActive] = useState(0);

  if (!project) return <Missing>404 — {id}</Missing>;

  const shots = project.shots;
  const current = Math.min(active, shots.length - 1);
  const step = (delta: number) => setActive((i) => (i + delta + shots.length) % shots.length);

  return (
    <Scroll>
      <Inner>
        <Head>
          <IconTile>
            <img src={project.icon} alt="" />
          </IconTile>
          <div>
            <Title>{project.name}</Title>
            <Tags>
              {project.tech.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </Tags>
          </div>
        </Head>

        <Blurb>{project.blurb}</Blurb>

        <Gallery
          onKeyDown={(e) => {
            if (shots.length < 2) return;
            if (e.key === 'ArrowLeft') step(-1);
            if (e.key === 'ArrowRight') step(1);
          }}
        >
          <Stage>
            <img src={shots[current]} alt={`${project.name} — ${current + 1}`} />
            {shots.length > 1 && (
              <>
                <Arrow $side="left" aria-label={t('os.projects.prevShot')} onClick={() => step(-1)}>
                  <ChevronLeft size={18} />
                </Arrow>
                <Arrow $side="right" aria-label={t('os.projects.nextShot')} onClick={() => step(1)}>
                  <ChevronRight size={18} />
                </Arrow>
                <Count>
                  {current + 1} / {shots.length}
                </Count>
              </>
            )}
          </Stage>
          {shots.length > 1 && (
            <Thumbs>
              {shots.map((src, i) => (
                <Thumb
                  key={src}
                  $active={i === current}
                  aria-label={`${project.name} — ${i + 1}`}
                  aria-current={i === current}
                  onClick={() => setActive(i)}
                >
                  <img src={src} alt="" />
                </Thumb>
              ))}
            </Thumbs>
          )}
        </Gallery>

        <Links>
          {project.website && (
            <a href={project.website} target="_blank" rel="noopener noreferrer">
              {t('os.projects.openWeb')}
            </a>
          )}
          <a href={project.repository} target="_blank" rel="noopener noreferrer">
            {t('os.projects.source')}
          </a>
        </Links>
        {!project.website && <NoLive>{t('os.projects.noLive')}</NoLive>}
      </Inner>
    </Scroll>
  );
};

export default ProjectPage;
