import styles from './SelectLanguage.module.scss';
import BrazilFlag from '../assets/images/flags/brazil.png';
import USFlag from '../assets/images/flags/united_states.png';

const SelectLanguage = ({ setLanguage }) => {
  return (
    <div className={ styles.languageSelectorWrapper }>
      <div
        className={ styles.languageDiv }
        onClick={ () => setLanguage('en') }
      >
        <img
          className={ styles.flag }
          src={ USFlag }
          alt="US Flag"
        />
        <p>English (US)</p>
      </div>
      <div
        className={ styles.languageDiv }
        onClick={ () => setLanguage('pt-BR') }
      >
        <img
        className={ styles.flag }
          src={ BrazilFlag }
          alt="Brazil Flag"
        />
        <p>Português (Brasil)</p>
      </div>
    </div>
  );
}

export default SelectLanguage;