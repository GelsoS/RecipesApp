import React, { useState, useContext, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import getCategories from '../api/getCategories';
import getByCategorie from '../api/getByCategorie';

import recipeContext from '../contex/recipeContext';
import getInitialRecipes from '../api/getInitialRecipes';
import './css/categories.css';

function Categories() {
  const history = useHistory();
  const { pathname } = history.location;
  const [categories, setCategories] = useState([]);
  const [buttonPressed, setbuttonPressed] = useState('');

  const {
    setApiResponse,
    setMainLoading,
  } = useContext(recipeContext);

  useEffect(() => {
    getCategories(pathname).then((response) => setCategories(response));
  }, [pathname]);

  const handleButton = async (categorie) => {
    setMainLoading(true);
    if (buttonPressed === categorie) {
      setbuttonPressed('');
      const lastItemIndex = 12;
      const response = await getInitialRecipes(pathname);

      setApiResponse(response.slice(0, lastItemIndex));
    } else {
      setbuttonPressed(categorie);
      const lastItem = 12;
      const items = await getByCategorie(pathname, categorie)
        .then((response) => (response.slice(0, lastItem)));

      setApiResponse(items);
    }
  };

  const handleAllButton = async () => {
    setbuttonPressed('');
    const lastItemIndex = 12;
    const response = await getInitialRecipes(pathname);
    setApiResponse(response.slice(0, lastItemIndex));
  };

  const renderCategories = () => {
    const lastItem = 5;
    return (
      categories.slice(0, lastItem).map((c) => (
        <button
          className="buttonCategorie"
          type="button"
          key={ c.strCategory }
          data-testid={ `${c.strCategory}-category-filter` }
          onClick={ () => handleButton(c.strCategory) }
        >
          { c.strCategory }

        </button>
      ))
    );
  };

  return (
    <div className="categories">
      <button
        type="button"
        onClick={ () => handleAllButton() }
        data-testid="All-category-filter"
      >
        All

      </button>
      { renderCategories() }
    </div>
  );
}

export default Categories;
