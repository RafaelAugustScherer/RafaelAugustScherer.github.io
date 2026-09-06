import { useState, useEffect } from 'react';
import * as S from './MovingText.styles';

type MovingTextProps = {
  words: string[];
};

type TextState = {
  value: string;
  position: number;
  word: number;
  direction: number;
};

const MovingText = ({ words }: MovingTextProps) => {
  const initialValue: TextState = {
    value: '',
    position: 0,
    word: 0,
    direction: 1,
  };
  const [text, setText] = useState<TextState>(initialValue);
  const [clearTimeout, setClearTimeout] = useState<() => void>(
    () => () => {}
  );

  useEffect(() => {
    if (clearTimeout) clearTimeout();
    setText(initialValue);
  }, [words]);

  useEffect(() => {
    if (clearTimeout) clearTimeout();
    textHandler();
  }, [text]);

  useEffect(
    () => () => {
      if (clearTimeout) clearTimeout();
    },
    []
  );

  const textHandler = () => {
    let speed = 150;
    let { value, position, word, direction } = text;

    if (direction) {
      if (position === words[word].length) {
        direction = 0;
        speed = 2000;
      } else {
        value += words[word][position];
        position += 1;
      }
    } else {
      if (position === 0) {
        word = word === words.length - 1 ? 0 : word + 1;
        direction = 1;
        speed = 1000;
      } else {
        value = value.slice(0, value.length - 1);
        position -= 1;
      }
    }
    const timeoutId = window.setTimeout(() => {
      setText({ value, position, word, direction });
    }, speed);

    setClearTimeout(() => () => {
      window.clearTimeout(timeoutId);
    });
  };

  return <S.MovingText>{text.value}</S.MovingText>;
};

export default MovingText;
