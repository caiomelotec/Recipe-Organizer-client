import { ShoppingListAccordion } from "../componentes/ShoppingListAccordion";
import "../styles/Shoppinglist.css";

export const ShoppingList = () => {
  return (
    <div className="shoppinglist-wrapper">
      <div className="shoppinglist-container">
        <h2>Meine Einkaufsliste:</h2>
        <ShoppingListAccordion />
      </div>
    </div>
  );
};
