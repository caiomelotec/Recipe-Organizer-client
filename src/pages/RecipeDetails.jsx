import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/RecipeDetails.css";
import DOMPurify from "dompurify";
import { useAuthStore } from "../store/authStore";
import { ShareLinksModal } from "../componentes/ShareLinksModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const RecipeDetails = () => {
  const { currentUser } = useAuthStore((state) => ({
    currentUser: state.currentUser || null,
  }));

  const navigate = useNavigate();
  const location = useLocation();
  const recipeId = location.pathname.split("/")[2];
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [toggleShareModal, setShareModal] = useState(false);

  useEffect(() => {
    const fetchingRecipeAndUserDataByRecipeId = async () => {
      try {
        const response = await axios.get(
          `https://koch-8dbe7c0d957c.herokuapp.com/recipes/${recipeId}`
        );
        setRecipe(response.data);
      } catch (err) {
        console.error(err, "Error fetching the recipe data");
      }
    };
    fetchingRecipeAndUserDataByRecipeId();
  }, [recipeId]);

  useEffect(() => {
    const fetchingIngredientsData = async () => {
      try {
        const response = await axios.get(
          `https://koch-8dbe7c0d957c.herokuapp.com/recipes/${recipeId}/ingredients`
        );
        setIngredients(response.data);
      } catch (err) {
        console.error(err, "Error fetching the ingredients data");
      }
    };
    fetchingIngredientsData();
  }, []);

  const deleteRecipeById = async () => {
    try {
      const res = await axios.delete(
        `https://koch-8dbe7c0d957c.herokuapp.com/recipes/${recipeId}`,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.status === 200) {
        navigate("/");
      }
    } catch (err) {
      console.error(err, "Error by deleting the recipe");
    }
  };

  // shoppingList
  let ingredientsNames = ingredients.map((item) => item.ingredient_name);
  let recipeName = recipe.recipe_name;

  const notify = () => toast("Die Zutaten sind auf deine Einkaufsliste");

  const addInngredientsToShoppingList = async () => {
    let requestData = {
      recipeName: recipeName,
      ingredientsNames: ingredientsNames,
    };

    const authToken = currentUser.token;

    try {
      axios.post(
        "https://koch-8dbe7c0d957c.herokuapp.com/shoppingList",
        { requestData },
        {
          withCredentials: true,
          headers: {
            Authorization: authToken,
          },
        }
      );
      notify();
    } catch (error) {
      console.error(error, "Error by adding ingredients to shoppingList");
    }
  };

  if (!recipe) {
    return <div>Loading...</div>; // render the loading component if project is not found
  }

  return (
    <div className="detail-container-wrapper" style={{ marginBottom: "2rem" }}>
      <section className="detail-container">
        <h1 className="title-detail-page">{recipe.recipe_name}</h1>
        <img src={recipe.imgUrl} alt="" className="detail-page-img" />
        <div className="share-div">
          <button
            className="btn-detail-page"
            onClick={() => setShareModal(true)}
          >
            Teilen
          </button>
          <div className="delete-and-edit-div">
            {currentUser ? (
              <Link
                to={`/addrecipe?edit=2`}
                state={{
                  recipe,
                  ingredients,
                  recipe_preparation: recipe.recipe_preparation,
                }}
              >
                <button
                  className="delete-recipe-btn edit-recipe-btn"
                  style={
                    currentUser?.user.id == recipe.id
                      ? { cursor: "pointer" }
                      : { cursor: " not-allowed", backgroundColor: "gray" }
                  }
                >
                  Rezept bearbeiten
                </button>
              </Link>
            ) : null}
            {currentUser ? (
              <button
                className="delete-recipe-btn"
                onClick={deleteRecipeById}
                style={
                  currentUser.user.id == recipe.id
                    ? { cursor: "pointer" }
                    : { cursor: " not-allowed", backgroundColor: "gray" }
                }
              >
                Rezept löschen
              </button>
            ) : null}
          </div>
        </div>
        {/* <div className="preparation-info-div">
          <p>60 Min.</p>
          <p>normal</p>
          <p>888 kcal</p>
        </div> */}
        <div className="ingredients-wrapper-div">
          {ingredients.map((ingredient, index) => (
            <div
              className="ingredients-div-container"
              key={ingredient.ingredient_id}
            >
              <div
                className={
                  index % 2 === 0
                    ? "ingredient-item-div-active"
                    : "ingredient-item-div"
                }
              >
                <div className="div-quantity">{ingredient.quantity}</div>
                <div className="div-unit">{ingredient.unit}</div>
                <div className="p-ingredient-name">
                  {ingredient.ingredient_name}
                </div>
              </div>
            </div>
          ))}
          <button
            className="btn-detail-page"
            onClick={addInngredientsToShoppingList}
          >
            Auf die Einkaufsliste setzen
          </button>
        </div>
        <section className="detail-container-section-two">
          <h1 className="second-section-detail-title">Zubereitung</h1>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(recipe.recipe_preparation),
            }}
          ></p>
        </section>
        <section className="detail-container-section-three">
          <h1 className="second-section-detail-title">Rezept von</h1>
          <div className="user-info-container">
            <img src={recipe.user_img} alt="" />
            <p className="username-info">
              {recipe.firstname + " " + recipe.lastname}
            </p>
            <p className="recipe-date-info">Erstellt am {recipe.date}</p>
          </div>
        </section>
        {toggleShareModal ? (
          <ShareLinksModal recipeId={recipeId} setShareModal={setShareModal} />
        ) : null}
      </section>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};
