const darkModeSwitch = document.getElementById('darkmode');
const moonIcon = document.getElementsByClassName('bi-moon-fill')[0];

const bodyElements = ['main', 'footer'].map((tag) => document.getElementsByTagName(tag)[0]);
const headerElements = [
  ...['h2', 'h3'].map((tag) => document.getElementsByTagName(tag)),
  document.getElementsByClassName('article-title'),
];
const textElements = ['p', 'li', 'hr'].map((tag) => document.getElementsByTagName(tag));
const oddArticles = [document.querySelectorAll('.exp-section article:nth-of-type(odd)')];
const evenArticles = [document.querySelectorAll('.exp-section article:nth-of-type(even)')];

const switchText = (textEl) => textEl.classList.toggle('text-white');
const switchBackground = (el) => el.classList.toggle('bg-dark');
const switchArticleBg = (article, type) => {
  let color;
  if (darkModeSwitch.checked) {
    type === 'odd' ? (color = '#112640') : (color = '#0E3811');
  } else {
    type === 'odd' ? (color = '#E2EFFF') : (color = '#EBFFEC');
  }
  article.style.backgroundColor = color;
};

const switchElements = (elements, callback) => {
  for (el of elements) callback(el);
};

const setLocalStorageDarkmode = (val) => localStorage.setItem('darkmode', val);

const switchDarkMode = () => {
  if (!localStorage.getItem('darkmode')) setLocalStorageDarkmode('true');
  else {
    darkModeSwitch.checked
    ? setLocalStorageDarkmode('true')
    : setLocalStorageDarkmode('false');
  }

  moonIcon.classList.toggle('text-warning');

  bodyElements.forEach((el) => switchBackground(el));
  headerElements.forEach((el) => switchElements(el, switchText));
  textElements.forEach((el) => switchElements(el, switchText));
  oddArticles.forEach((el) => switchElements(el, (el) => switchArticleBg(el, 'odd')));
  evenArticles.forEach((el) => switchElements(el, (el) => switchArticleBg(el, 'even')));
};

window.addEventListener('load', () => {
  if (localStorage.getItem('darkmode') === 'true') {
    darkModeSwitch.checked = true;
    switchDarkMode();
  }
});

darkModeSwitch.addEventListener('change', ({ target }) => {
  target.style.backgroundImage =
    'url("data:image/svg+xml,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 8 8"%3e%3ccircle r="3" fill="rgba%280, 0, 0, 0.25%29"/%3e%3c/svg%3e")';
  switchDarkMode();
});
