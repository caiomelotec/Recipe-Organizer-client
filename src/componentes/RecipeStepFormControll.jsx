import React from "react";

export const RecipeStepFormControll = ({ setFormStep, formStep }) => {
  return (
    <>
      <div className="recipe-steps-div">
        <h2>Rezept eingeben</h2>
        <button
          style={
            formStep === 0
              ? { backgroundColor: "rgb(217, 48, 18)", color: "white" }
              : null
          }
          className="steps-btn"
          onClick={() => setFormStep(0)}
        >
          1️⃣ Rezept
        </button>
        <button
          style={
            formStep === 1
              ? { backgroundColor: "rgb(217, 48, 18)", color: "white" }
              : null
          }
          className="steps-btn"
          onClick={() => setFormStep(1)}
        >
          2️⃣ Zubereitung
        </button>
      </div>
    </>
  );
};
