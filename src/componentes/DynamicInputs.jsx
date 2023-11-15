import React from "react";
import unitsArray from "../data";

export const DynamicInputs = ({ inputList, setInputList }) => {
  const handleDynamicInputsChange = (e, index) => {
    let data = [...inputList];
    data[index][e.target.name] = e.target.value;
    setInputList(data);
  };

  const handleRemoveField = (index) => {
    let data = [...inputList];
    data.splice(index, 1);
    setInputList(data);
  };

  console.log(inputList);

  return (
    <>
      {inputList.map((ingredient, index) => (
        <div
          key={ingredient?.ingredient_id || index}
          className="dynamic-inputs-div"
        >
          <input
            type="text"
            value={ingredient.quantity}
            name="quantity"
            id="quantity"
            placeholder="Menge"
            onChange={(e) => handleDynamicInputsChange(e, index)}
          />
          <select
            name="unit"
            id="unit"
            onChange={(e) => handleDynamicInputsChange(e, index)}
            value={ingredient.unit}
            className="unity-select"
          >
            {unitsArray.map((unit, i) => (
              <option key={i} value={unit} name="units" id="units">
                {unit}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={ingredient.ingredient_name}
            onChange={(e) => handleDynamicInputsChange(e, index)}
            placeholder="Zutatenname"
            name="ingredient_name"
            id="ingredient_name"
          />
          {inputList.length > 1 && (
            <button
              className="remove-inputs-btn"
              onClick={() => handleRemoveField(index)}
              type="button"
            >
              Löschen
            </button>
          )}
        </div>
      ))}
    </>
  );
};
