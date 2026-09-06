import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import * as S from './style/LanguageSelector.styles';
import { languages, type Language } from '../../data/language';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<Partial<Language>>(
    {}
  );

  useEffect(() => {
    if (i18n.language !== selectedLanguage.value) {
      setSelectedLanguage(getLanguageByValue(i18n.language));
    }
  }, [t]);

  useEffect(() => {
    if (selectedLanguage.value && i18n.language !== selectedLanguage.value) {
      i18n.changeLanguage(selectedLanguage.value);
    }
  }, [selectedLanguage]);

  const getLanguageByValue = (value: string): Language =>
    languages.find((lng) => value.startsWith(lng.value)) || languages[0];

  return (
    <S.LanguageSelectorWrapper>
      <S.LanguageSelectorFlag
        src={selectedLanguage.flag}
        alt=""
        width="45"
        height="30"
      />
      <select
        name="language"
        aria-label="Select website language"
        value={selectedLanguage.value || ''}
        onChange={({ target }) =>
          setSelectedLanguage(getLanguageByValue(target.value))
        }
      >
        {languages.map(({ name, value }) => (
          <option key={`lng-option-${name}`} value={value}>
            {name}
          </option>
        ))}
      </select>
    </S.LanguageSelectorWrapper>
  );
};

export default LanguageSelector;
