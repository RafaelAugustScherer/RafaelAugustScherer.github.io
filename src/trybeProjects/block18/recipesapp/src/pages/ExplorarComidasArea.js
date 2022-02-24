import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';
import UseRecipe from '../hooks/UseRecipe';
import Card from '../components/Card';

function ExplorarComidasArea() {
  const comidasOuBebidas = 'comidas';
  const [areas, setAreas] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const MAX_LENGTH = 12;
  const { fetchRecipes, fetchRecipesByArea } = UseRecipe(MAX_LENGTH);

  useEffect(() => {
    const fetchStartRecipes = async () => {
      const newRecipes = await fetchRecipes(comidasOuBebidas);
      setRecipes(newRecipes);
    };

    const fetchAreas = async () => {
      const newAreas = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
        .then((response) => response.json())
        .then(({ meals, drinks }) => meals || drinks);
      setAreas([
        'All',
        ...newAreas.map(({ strArea }) => strArea),
      ]);
    };
    fetchAreas();
    fetchStartRecipes();
  }, []);

  return (
    <>
      <Header title="Explorar Origem" comidasOuBebidas="comidas" />
      <div>
        <select
          name="country"
          id="country"
          data-testid="explore-by-area-dropdown"
          onChange={ async ({ target: { value } }) => {
            const newRecipes = value === 'All'
              ? await fetchRecipes(comidasOuBebidas)
              : await fetchRecipesByArea(value);
            setRecipes(newRecipes);
          } }
        >
          {
            areas.map((area) => (
              <option key={ area } value={ area } data-testid={ `${area}-option` }>
                { area }
              </option>
            ))
          }
        </select>
        {
          recipes.map(({ id, name, image }, index) => (
            <Card
              key={ name }
              thumb={ image }
              name={ name }
              index={ index }
              id={ id }
              url={ comidasOuBebidas }
            />
          ))
        }
      </div>
      <MenuInferior />
    </>
  );
}

export default ExplorarComidasArea;
