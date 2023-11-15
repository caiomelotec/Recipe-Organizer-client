import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const AddRecipeFormSecondSection = ({ value, setValue }) => {
  return (
    <>
      <div className="recipe-preparation-div">
        <h5>Rezeptzubereitung</h5>
        <p>
          Hier kannst du beschreiben, welche Schritte für die Zubereitung des
          Rezeptes notwendig sind. Bitte achte darauf, dass alle relevanten
          Informationen enthalten sind, z.B. Angaben zur Temperatur des
          Backofens und dass alle von dir aufgeführten Zutaten enthalten sind
        </p>
        <div className="editor-container">
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            name="recipe_preparation"
            id="recipe_preparation"
            className="editor"
            required
          />
        </div>
      </div>
      <div className="btns-div">
        <button type="submit" className="handle-submit-btn">
          Rezept einreichen
        </button>
      </div>
    </>
  );
};
