import React from "react";

export const AddRecipeFormFirstSection = ({
  handleInputChange,
  recipe,
  setFile,
  file,
}) => {
  return (
    <>
      <div className="recipe-name">
        <label>Rezeptname</label>
        <input
          type="text"
          placeholder="Rezeptname"
          name="recipe_name"
          value={recipe.recipe_name}
          id="recipe_name"
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="img-url">
        <input
          style={{ display: "none" }}
          type="file"
          id="file-recipe"
          name=""
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div className="file-recipe-div">
          <p className="file-recipe-text">
            Wähle die passende Datei (JPG) auf deiner Festplatte aus
          </p>
          <label htmlFor="file-recipe" id="file-recipe" className="file-recipe">
            Rezept Bild auswählen
          </label>
        </div>
        {/* <label>Image URL</label>
        <input
          type="text"
          name="imgUrl"
          value={recipe.imgUrl}
          id="imgUrl"
          onChange={handleInputChange}
        /> */}
      </div>
      <div className="portion">
        <label>Portionen</label>
        <div className="portion-info-div">
          <span>Das Rezept ist ausgelegt für</span>
          <input
            min={0}
            type="number"
            name="portion"
            value={recipe.portion}
            id="portion"
            onChange={handleInputChange}
            required
          />
          <span>Personen / Portionen.</span>
        </div>
      </div>
      <div className="dynamic-inputstitle-div">
        <p className="menge-title">Menge</p>
        <p className="einheit-title">Einheit</p>
        <p>Zutatenname</p>
      </div>
    </>
  );
};
