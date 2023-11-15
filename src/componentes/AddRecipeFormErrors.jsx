import React from "react";

export const AddRecipeFormErrors = ({ formErrors }) => {
  return (
    <>
      <div className="errorMessages-divs">
        {formErrors.recipe_name && <span>{formErrors.recipe_name}</span>}
        {formErrors.recipe_preparation && (
          <span>{formErrors.recipe_preparation}</span>
        )}
        {formErrors.portion && <span>{formErrors.portion}</span>}
      </div>
    </>
  );
};
