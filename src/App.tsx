import { useEffect } from 'react';
import './translation/i18n';
import { useTranslation } from 'react-i18next';
import Audio from './components/Audio/Audio';
import Header from './components/Header/Header';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import AudioProvider from './providers/AudioProvider';
import Footer from './components/Footer/Footer';
import { initScrollReveal } from './utils/scrollReveal';
import { GlobalStyle } from './styles/GlobalStyle';

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => initScrollReveal(), []);

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage || 'en';
  }, [i18n.resolvedLanguage]);

  return (
    <>
      <GlobalStyle />
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
};

export default App;
