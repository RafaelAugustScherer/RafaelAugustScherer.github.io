import Audio from './components/Audio/Audio';
import Header from './components/Header/Header';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import AudioProvider from './providers/AudioProvider';
import './App.css';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <>
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
