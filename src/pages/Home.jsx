import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { useSearch } from "../store/searchStore";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchString] = useSearch((state) => [state.searchString]);
  //
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "https://koch-8dbe7c0d957c.herokuapp.com/recipes"
        );
        setRecipes(response.data);
      } catch (err) {
        console.error(err, "Error fetching the recipes");
      }
    };
    fetchRecipes();
  }, []);
  // console.log(recipes);
  return (
    <div className="recipes-wrapper-container">
      <div className="recipes-container">
        {recipes.map((recipe) => {
          if (
            searchString &&
            !recipe.recipe_name
              .toLowerCase()
              .includes(searchString.toLowerCase())
          )
            return null;
          return (
            <div key={recipe.recipe_id} className="recipe-item-div">
              <div className="recipe-img-div">
                <img className="recipe-img" src={recipe.imgUrl} alt="" />
              </div>
              <div className="recipe-name-div">
                <h4>{recipe.recipe_name}</h4>
              </div>
              <div className="details-div">
                <button className="details-btn">
                  <Link id="link-details" to={`/recipes/${recipe.recipe_id}`}>
                    Mehr Sehen
                  </Link>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
