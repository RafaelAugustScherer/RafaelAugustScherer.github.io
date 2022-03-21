import { useEffect, useState } from 'react';
import AOS from 'aos';
import './translation/i18n';
import { useTranslation } from 'react-i18next';
import Audio from './components/Audio/Audio';
import Header from './components/Header/Header';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import AudioProvider from './providers/AudioProvider';
import './App.css';
import Footer from './components/Footer/Footer';
import SelectLanguage from './components/SelectLanguage';

const App = () => {
  const { i18n } = useTranslation();
  const [ language, setLanguage ] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 2000,
      disable: 'mobile'
    });
    AOS.refresh();

    document.body.classList.add('no-scroll');
  }, []);

  useEffect(() => {
    i18n.changeLanguage(language);
    language && document.body.classList.remove('no-scroll');
  }, [ language ]);

  return (
    <>
      {
        !language && (
          <SelectLanguage setLanguage={setLanguage} />
        )
      }
      <AudioProvider>
        <Audio />
      </AudioProvider>
      <Header />
      <About />
      <Projects />
      <Experience />
      <Footer />
    </>
  );
}

export default App;
