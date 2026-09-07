import styled from 'styled-components';
import type { Project } from '../../data/projects';

const Widget = styled.section`
  position: absolute;
  top: calc(var(--bar-h) + 14px);
  right: 12px;
  z-index: 45;
  width: 186px;
  padding: 12px 12px 10px;
  border: 1px solid var(--line);
  background: rgba(10, 8, 20, 0.55);
  backdrop-filter: blur(4px);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.45), inset 0 0 22px rgba(1, 251, 251, 0.05);
  user-select: none;
`;

const Header = styled.p`
  font-family: var(--mono);
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--magenta);
  margin: 0 0 10px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Row = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 6px;
  border: 1px solid transparent;
  border-radius: 3px;
  background: none;
  text-align: left;
  cursor: pointer;
  transition: background 0.12s ease, border-color 0.12s ease;
  &:hover {
    background: rgba(1, 251, 251, 0.09);
    border-color: var(--line);
  }
  .glyph {
    width: 38px;
    height: 34px;
    flex: none;
    display: grid;
    place-items: center;
    border: 1px solid var(--line);
    background: var(--surface);
    box-shadow: inset 0 0 14px rgba(1, 251, 251, 0.1);
  }
  .glyph img {
    width: 26px;
    height: 26px;
    mix-blend-mode: screen;
    pointer-events: none;
  }
  .label {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--text-dim);
    line-height: 1.25;
  }
`;

interface ProjectsWidgetProps {
  projects: Project[];
  onOpen: (project: Project) => void;
}

const ProjectsWidget = ({ projects, onOpen }: ProjectsWidgetProps) => (
  <Widget className="os-widget" aria-label="Projects">
    <Header>~/projects</Header>
    <List>
      {projects.map((project) => (
        <Row key={project.id} title={project.name} onClick={() => onOpen(project)}>
          <span className="glyph">
            <img src={project.icon} alt="" draggable={false} />
          </span>
          <span className="label">{project.name}</span>
        </Row>
      ))}
    </List>
  </Widget>
);

export default ProjectsWidget;
