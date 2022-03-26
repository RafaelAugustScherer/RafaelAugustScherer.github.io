import { useState, useEffect } from 'react';
import styles from './MovingText.module.css';

const MovingText = ({ words }) => {
  const initialValue = {
    value: '',
    position: 0,
    word: 0,
    direction: 1,
  };
  const [ text, setText ] = useState(initialValue);
  const [ clearTimeout, setClearTimeout ] = useState(() => function(){});

  useEffect(() => {
    clearTimeout && clearTimeout();
    setText(initialValue);
  }, [words]);

  useEffect(() => textHandler(), [text]);

  const textHandler = () => {
    let speed = 150;
    let { value, position, word, direction } = text;

    if (direction) {
      if (position === words[ word ].length){
        direction = 0;
        speed = 2000;
      }
      else {
        value += words[word][position];
        position += 1;
      }
    }
    else {
      if (position === 0) {
        word = word === words.length - 1 ? 0 : word + 1;
        direction = 1;
        speed = 1000;
      }
      else {
        value = value.slice(0, value.length - 1);
        position -= 1;
      }
    }
    const timeoutId = window.setTimeout(() => {
      setText({ value, position, word, direction });
    }, speed);

    setClearTimeout(() => function() {
      window.clearTimeout(timeoutId);
    });
  }

  return (
    <span className={ styles.movingText }>{text.value}</span>
  );
}

export default MovingText;