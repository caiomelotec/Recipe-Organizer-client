// import React, { useRef } from "react";
import "../styles/AddRecipe.css";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { RecipeStepFormControll } from "../componentes/RecipeStepFormControll";
import { AddRecipeFormErrors } from "../componentes/AddRecipeFormErrors";
import { AddRecipeFormFirstSection } from "../componentes/AddRecipeFormFirstSection";
import { AddRecipeFormSecondSection } from "../componentes/AddRecipeFormSecondSection";
import { DynamicInputs } from "../componentes/DynamicInputs";
// spinner
import FadeLoader from "react-spinners/FadeLoader";

export const AddRecipe = () => {
  const location = useLocation();
  const state = location.state;
  const isEdit = location.search.includes("edit");
  const navigate = useNavigate();
  // file state
  const [file, setFile] = useState(null);
  // REACT QUILL
  const [value, setValue] = useState(isEdit ? state?.recipe_preparation : "");
  // state for ingredients
  const [inputList, setInputList] = useState(() => {
    if (isEdit && state?.ingredients) {
      return state.ingredients;
    } else {
      return [{ ingredient_name: "", unit: "", quantity: "" }];
    }
  });
  // add new input fields
  const handleAddField = () => {
    const ingredientsData = { ingredient_name: "", unit: "", quantity: "" };
    setInputList([...inputList, ingredientsData]);
  };
  // console.log("STATE LOG ingredients id:", state.ingredients[0].recipe_id);

  // recipe state
  const [recipe, setRecipe] = useState({
    recipe_name: isEdit ? state.recipe.recipe_name : "",
    imgUrl: isEdit ? state.recipe.imgUrl : "",
    portion: isEdit ? state.recipe.portion : "",
    recipe_preparation: value,
    date: moment(Date.now()).format("DD.MM.YYYY HH:mm"),
  });

  // spinner state
  let [loading, setLoading] = useState(false);
  // let [color, setColor] = useState("#ffa500");

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const handleInputChange = (e) => {
    const { name, value, required } = e.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));

    // Validate required fields
    if (required && value.trim() === "") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessages[name],
      }));
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  // upload Recipe IMG
  const upload = async () => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post(
          "https://koch-8dbe7c0d957c.herokuapp.com/uploadrecipeimg",
          formData,
          { withCredentials: true }
        );
        console.log(res.data);
        return res.data;
      } catch (err) {
        console.log(err);
        return ""; // Return an empty string if there was an error during image upload
      }
    } else {
      // Return the previous image URL (imgUrl) if no new image is selected
      return recipe.imgUrl;
    }
  };

  // add new Recipe
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const imgUrl = await upload();
    // Update the recipe preparation data from the ReactQuill editor before sending it to the server
    const updatedRecipe = { ...recipe, imgUrl, recipe_preparation: value };
    const requestData = { recipe: updatedRecipe, inputList };
    console.log(requestData);
    try {
      state
        ? await axios.put(
            `https://koch-8dbe7c0d957c.herokuapp.com/recipes/${state.recipe.recipe_id}`,
            { requestData },
            { withCredentials: true }
          )
        : await axios.post(
            "https://koch-8dbe7c0d957c.herokuapp.com/addrecipe",
            requestData,
            {
              withCredentials: true,
            }
          );
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // handle separation of forms
  const [formStep, setFormStep] = useState(0);

  // validation of forms
  const [formErrors, setFormErrors] = useState({
    recipe_name: "",
    recipe_preparation: "",
    portion: "",
    // Add more fields as needed
  });

  const errorMessages = {
    recipe_name: "Bitte gib einen Rezeptnamen ein.",
    recipe_preparation: "Bitte verfasse einen Zubereitungstext.",
    portion:
      "Bitte gib die Anzahl der Portionen an, für die dein Rezept ausgelegt ist.",
  };

  return (
    <div className="forms-wrapper-container">
      {loading ? (
        <div className="sweet-loading">
          <h3 style={{ marginBottom: "5px" }}>Wird geladen...</h3>
          <FadeLoader
            color="#ffa500"
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="form-container">
          <RecipeStepFormControll
            formStep={formStep}
            setFormStep={setFormStep}
          />
          <div className="background-div"></div>
          <AddRecipeFormErrors formErrors={formErrors} />
          {/* form */}
          <form onSubmit={handleSubmit}>
            {formStep >= 0 && (
              // first form step
              <section
                className="section-form-one"
                style={
                  formStep === 0
                    ? { display: "block" }
                    : { display: "none", position: "absolute" }
                }
              >
                <AddRecipeFormFirstSection
                  recipe={recipe}
                  handleInputChange={handleInputChange}
                  setFile={setFile}
                  file={file}
                />
                <DynamicInputs
                  setInputList={setInputList}
                  inputList={inputList}
                />
              </section>
            )}

            <section
              className="section-form-two"
              style={
                formStep === 1 ? { display: "block" } : { display: "none" }
              }
            >
              <AddRecipeFormSecondSection
                value={value}
                setValue={setValue}
                setFormStep={setFormStep}
                handleSubmit={handleSubmit}
              />
            </section>
          </form>
          {formStep === 0 && (
            <div className="btns-div">
              <button className="add-inputs-btn" onClick={handleAddField}>
                Weitere Zutaten hinzufügen
              </button>
              <button onClick={() => setFormStep(1)} className="step-btn">
                Weiter
              </button>
            </div>
          )}
          {formStep === 1 && (
            <button
              onClick={() => setFormStep(0)}
              className="step-btn step-back-btn"
            >
              Zurück
            </button>
          )}
        </div>
      )}
    </div>
  );
};
