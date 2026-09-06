import styled from 'styled-components';

export const AppScroll = styled.div`
  height: 100%;
  overflow: auto;
  padding: 18px 20px 22px;
`;

export const Eyebrow = styled.p`
  font-family: var(--mono);
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--magenta);
  margin: 0 0 10px;
`;

export const AppTitle = styled.h2`
  font-family: var(--ui);
  font-size: 19px;
  font-weight: 600;
  margin: 0 0 4px;
  letter-spacing: 0.01em;
  text-wrap: balance;
`;

export const SubMono = styled.p`
  font-family: var(--mono);
  font-size: 11.5px;
  color: var(--cyan);
  margin: 0 0 16px;
`;

export const SectionLabel = styled.h3`
  font-family: var(--ui);
  font-size: 12px;
  margin: 20px 0 10px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--cyan);
  font-weight: 600;
`;

export const Prose = styled.div`
  p {
    margin: 0 0 11px;
    font-size: 13.5px;
    line-height: 1.62;
    color: var(--text-dim);
    max-width: 62ch;
  }
  strong { color: var(--text); font-weight: 600; }
  em, i { color: var(--text); font-style: italic; }
`;

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const Chip = styled.span`
  font-family: var(--mono);
  font-size: 10.5px;
  padding: 3px 9px;
  border: 1px solid var(--line);
  color: var(--text-dim);
  background: var(--surface-2);
`;
