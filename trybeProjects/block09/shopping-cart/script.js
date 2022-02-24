const createLoadingElement = () => {
  const loadingDiv = document.getElementsByClassName('loading-div')[0];
  const loadingElement = document.createElement('span');
  loadingElement.className = 'loading';
  loadingElement.innerText = 'Loading...';

  loadingDiv.appendChild(loadingElement);
  loadingDiv.style.display = 'flex';
};

const removeLoadingElement = () => {
  const loadingDiv = document.getElementsByClassName('loading-div')[0];
  const loadingElement = document.getElementsByClassName('loading')[0];

  if (loadingElement) {
    loadingElement.parentElement.removeChild(loadingElement);
    loadingDiv.style.display = 'none';
  }
};

const fetchListData = async (query, resolve) => {
  createLoadingElement();

  await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`)
    .then((response) => {
      removeLoadingElement();
      return response.json();
    })
    .then(({ results }) => resolve(results));
};

const fetchCartItemData = async (id, resolve) => {
  createLoadingElement();

  await fetch(`https://api.mercadolibre.com/items/${id}`)
    .then((response) => {
      removeLoadingElement();
      return response.json();
    })
    .then((result) => {
      resolve(result);
    });
};

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement(
    'button', 'item__add btn btn-success', 'Adicionar ao carrinho!',
    ));

  return section;
};

const checkLocalStorage = () => {
  if (!localStorage.getItem('cart')) localStorage.setItem('cart', JSON.stringify([]));
};

const addItemToLocalStorage = (id) => {
  checkLocalStorage();
  const cart = JSON.parse(localStorage.getItem('cart'));
  localStorage.setItem('cart', JSON.stringify([...cart, id]));
};

const removeItemFromLocalStorage = (id) => {
  checkLocalStorage();
  const cart = JSON.parse(localStorage.getItem('cart'));
  localStorage.setItem('cart', JSON.stringify(cart.filter((e) => e !== id)));
};

const addTotalCartPrice = ({ price }) => {
  const totalPriceSpan = document.getElementsByClassName('total-price')[0];

  totalPriceSpan.innerText = Math.round((parseFloat(totalPriceSpan.innerText) + price) * 100) / 100;
};

const removeTotalCartPrice = ({ price }) => {
  const totalPriceSpan = document.getElementsByClassName('total-price')[0];
  const cart = JSON.parse(localStorage.getItem('cart'));
  if (cart.length === 0) totalPriceSpan.innerText = 0;
  else {
    totalPriceSpan.innerText = Math.round((
      parseFloat(totalPriceSpan.innerText) - price
      ) * 100) / 100;
  }
};

const cartItemClickListener = ({ target }) => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  const targetArr = target.innerText.split(' ');
  const id = cart.reduce((acc, cur) => {
    if (targetArr.includes(cur)) return targetArr[1];
    return acc;
  }, '');

  removeItemFromLocalStorage(id);
  fetchCartItemData(id, removeTotalCartPrice);
  target.remove();
};

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${id} | NAME: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addItemsToList = (items) => {
  const itemsList = document.getElementsByClassName('items')[0];
  while (itemsList.firstChild) itemsList.removeChild(itemsList.firstChild);

  items.forEach((item) => itemsList.appendChild(createProductItemElement(item)));
};

const addItemToCart = (item) => {
  const cartItemsList = document.getElementsByClassName('cart__items')[0];
  cartItemsList.appendChild(createCartItemElement(item));
  fetchCartItemData(item.id, addTotalCartPrice);
};

const emptyCart = () => {
  const cartList = document.getElementsByClassName('cart__items')[0];
  while (cartList.firstChild) cartList.removeChild(cartList.firstChild);

  localStorage.setItem('cart', JSON.stringify([]));
  removeTotalCartPrice(0);
};

const prepareAddToCartButtons = () => {
  const addToCartButtons = document.getElementsByClassName('item__add');
  const itemsIds = document.getElementsByClassName('item__sku');
  // https://www.geeksforgeeks.org/htmlcollection-for-loop/
  Array.from(addToCartButtons).forEach((el, id) =>
    el.addEventListener('click', () => {
      fetchCartItemData(itemsIds[id].innerText, addItemToCart);
      addItemToLocalStorage(itemsIds[id].innerText);
    }));
};

window.onload = async () => {
  // Carrega lista de produtos - Req 1

  await fetchListData('computador gamer', addItemsToList);

  // Adiciona listener para os botões 'Adicionar ao carrinho' - Req 2
  prepareAddToCartButtons();
};

// Verifica a presença de um carrinho salvo no localStorage - Req 4
window.addEventListener('load', () => {
  checkLocalStorage();
  const cart = JSON.parse(localStorage.getItem('cart'));
  cart.forEach((id) => fetchCartItemData(id, addItemToCart));
});

// Adiciona listener para botão de esvaziar o carrinho - Req 6
window.addEventListener('load', () => {
  const emptyButton = document.getElementsByClassName('empty-cart')[0];
  emptyButton.addEventListener('click', emptyCart);
});

// DESAFIO DO RAWNALD

window.addEventListener('load', () => {
  const searchBar = document.getElementById('search-bar');
  const searchBtn = document.getElementById('search-btn');
  searchBtn.addEventListener('click', async (evt) => {
    evt.preventDefault();
    await fetchListData(searchBar.value, addItemsToList);
    prepareAddToCartButtons();
  });
});
