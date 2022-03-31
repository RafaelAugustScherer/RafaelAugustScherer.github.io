import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import styles from './style/LanguageSelector.module.scss';
import { languages } from '../../data/language';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState({});

  useEffect(() => {
    if (i18n.language !== selectedLanguage.value) {
      setSelectedLanguage(getLanguageByValue(i18n.language));
    }
  }, [t]);

  useEffect(() => {
    if (i18n.language !== selectedLanguage.value) {
      i18n.changeLanguage(selectedLanguage.value);
    }
  }, [selectedLanguage]);

  const getLanguageByValue = (value) =>
    languages.find((lng) => value.startsWith(lng.value));

  return (
    <div className={ styles.languageSelectorWrapper }>
      <img src={ selectedLanguage.flag } className={ styles.languageSelectorFlag } />
      <select
        value={ selectedLanguage.value }
        onChange={
          ({ target }) =>
          setSelectedLanguage(getLanguageByValue(target.value))
        }
      >
        {
          languages.map(({ name, value }) => (
            <option
              key={`lng-option-${name}`}
              value={ value }
            >
              { name }
            </option> 
          ))
        }
      </select>
    </div>
  );
}

export default LanguageSelector;