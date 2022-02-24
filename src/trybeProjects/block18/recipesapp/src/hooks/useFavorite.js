import { useCallback, useState, useEffect } from 'react';
import UseRecipe from './UseRecipe';

function useFavorite(id) {
  const { fetchRecipeById } = UseRecipe();

  const isFavorite = useCallback(() => {
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }

    const currentFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));

    return !!currentFavorites
      .find(({ id: favoriteId }) => favoriteId === id);
  }, [id]);

  const [favorite, setFavorite] = useState(isFavorite());

  useEffect(() => {
    setFavorite(isFavorite());
  }, [isFavorite]);

  const addComida = (newFavorite) => {
    const {
      name,
      image,
      strArea: area,
      strCategory: category } = newFavorite;
    return { name, area, image, category, alcoholicOrNot: '' };
  };

  const addBebida = (newFavorite) => {
    const {
      name,
      image,
      strCategory: category,
      alcoholicOrNot } = newFavorite;
    return { name, area: '', image, category, alcoholicOrNot };
  };

  const addFavorite = async (type) => {
    const currentFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const comidasOuBebidas = type === 'comida' ? 'comidas' : 'bebidas';
    let newFavorite = await fetchRecipeById(comidasOuBebidas, id);

    newFavorite = comidasOuBebidas === 'comidas'
      ? addComida(newFavorite) : addBebida(newFavorite);

    const newFavorites = [
      ...currentFavorites,
      { id, type, ...newFavorite },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFavorite(true);
  };

  const removeFavorite = () => {
    const currentFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = currentFavorites
      .filter(({ id: favoriteId }) => favoriteId !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFavorite(false);
  };

  const handleFavorite = (type) => {
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }

    if (isFavorite()) {
      removeFavorite();
    } else {
      addFavorite(type);
    }
  };

  return {
    favorite,
    handleFavorite,
  };
}

export default useFavorite;
