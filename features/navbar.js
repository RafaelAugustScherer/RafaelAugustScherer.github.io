const navbar = document.getElementsByClassName('navbar')[0];
const togglerButton = document.getElementsByClassName('navbar-toggler')[0];
const navLinks = document.getElementsByClassName('nav-link');
const menuToggle = document.getElementById('navbarToggler');
const bsCollapse = new bootstrap.Collapse(menuToggle, {
  toggle: false,
});

/* Declare function to hide navbar */

const hideNavbar = () => {
  if (menuToggle.classList.contains('show')) bsCollapse.toggle();
};

/* Declare functions to control navbar opacity */

const addNavbarOpacity = () => (navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.45)');
const removeNavbarOpacity = () => (navbar.style.backgroundColor = 'rgb(0, 0, 0)');

/* Hide navbar whenever a link is clicked in small page size */

for (let link of navLinks) link.addEventListener('click', () => hideNavbar);

/* Change opacity of navbar when scrolling */

document.body.onscroll = () => {
  hideNavbar();

  const windowScroll = window.scrollY;
  const limitScroll = 100;

  if (windowScroll > limitScroll) removeNavbarOpacity();
  if (windowScroll < limitScroll) addNavbarOpacity();
};

// https://developer.mozilla.org/en-US/docs/Web/API/Document/body
// https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
// https://www.w3schools.com/jsref/prop_element_scrolltop.asp

/* Handle opacity according to cursor in/out */

navbar.addEventListener('mouseover', removeNavbarOpacity);
navbar.addEventListener('mouseout', () => {
  if (!menuToggle.classList.contains('show')) addNavbarOpacity();
});
navbar.addEventListener('onfocus', removeNavbarOpacity);

// https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseover_event

/* Handle opacity when menu is shown or hidden */

menuToggle.addEventListener('hidden.bs.collapse', () => {
  if (window.scrollY < 100) addNavbarOpacity();
});
menuToggle.addEventListener('shown.bs.collapse', () => removeNavbarOpacity());

// https://getbootstrap.com/docs/5.1/components/collapse/#events
