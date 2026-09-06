import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
    -webkit-tap-highlight-color: transparent;
  }

  ::-webkit-scrollbar {
    width: 16px;
  }

  ::-webkit-scrollbar-track {
    background: #353535;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgb(136, 136, 136);
    border-radius: 10px;
    border: 3px solid #353535;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #9c9c9c;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  [data-aos] {
    opacity: 0;
    transition-property: opacity, transform;
    transition-duration: 800ms;
    transition-timing-function: ease-out;
    will-change: opacity, transform;
  }

  [data-aos='fade-right'] {
    transform: translate3d(-40px, 0, 0);
  }

  [data-aos='fade-left'] {
    transform: translate3d(40px, 0, 0);
  }

  [data-aos='fade-down'] {
    transform: translate3d(0, -40px, 0);
  }

  [data-aos].aos-animate {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  @media (prefers-reduced-motion: reduce) {
    [data-aos] {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
`;
