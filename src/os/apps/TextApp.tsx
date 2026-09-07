import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import type { WindowInstance } from '../types';
import { useOS } from '../osContext';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 12px;
  flex: none;
  border-bottom: 1px solid var(--line-soft);
  background: var(--surface-2);
  font-family: var(--mono);
  font-size: 11px;
  color: var(--text-dim);
  .name { color: var(--text); }
  .spacer { flex: 1; }
  .public {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: var(--amber);
    font-size: 10px;
  }
`;

const Area = styled.textarea`
  flex: 1;
  min-height: 0;
  resize: none;
  border: none;
  outline: none;
  background: var(--ground);
  color: var(--text);
  font-family: var(--mono);
  font-size: 13px;
  line-height: 1.7;
  padding: 14px 16px;
`;

const Missing = styled.div`
  display: grid;
  place-items: center;
  height: 100%;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--text-faint);
`;

const TextApp = ({ win }: { win: WindowInstance }) => {
  const { t } = useTranslation();
  const { nodeById, writeNode } = useOS();
  const fileId = win.props.fileId as string;
  const node = nodeById(fileId);

  if (!node) return <Missing>{t('os.text.missing')}</Missing>;

  return (
    <Wrap>
      <Head>
        <span className="name">{node.name}</span>
        <span className="spacer" />
        <span className="public">
          <Globe size={11} /> {t('os.text.public')}
        </span>
      </Head>
      <Area
        value={node.content}
        spellCheck={false}
        placeholder={t('os.text.placeholder')}
        onChange={(e) => writeNode(fileId, e.target.value)}
      />
    </Wrap>
  );
};

export default TextApp;
