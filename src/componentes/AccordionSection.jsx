import axios from "axios";
import { AiOutlineMinus, AiOutlinePlus, AiFillDelete } from "react-icons/ai";

export const AccordionSection = ({
  item,
  isActiveSection,
  setActiveIndex,
  sectionIndex,
}) => {
  const toggleSection = () => {
    const nextIndex = isActiveSection ? null : sectionIndex;
    setActiveIndex(nextIndex);
  };

  const deleteShoppingListItemById = async (id) => {
    try {
      await axios.delete(
        `https://koch-8dbe7c0d957c.herokuapp.com/deleteshoppinglistbyid`,
        {
          data: { id: id },
        }
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="shoppinglist-title">
        <h4>{item.sl_recipe_name}</h4>
        {isActiveSection ? (
          <AiOutlineMinus
            className="shoppinglist-arrow-icon"
            size={22}
            onClick={toggleSection}
          />
        ) : (
          <AiOutlinePlus
            className="shoppinglist-arrow-icon"
            size={20}
            onClick={toggleSection}
          />
        )}
        <span
          type="button"
          className="delete-item-shoppinglist"
          onClick={() => deleteShoppingListItemById(item.shoppingList_id)}
        >
          <AiFillDelete />
        </span>
      </div>
      {isActiveSection && (
        <div className="shoppinglist-list">
          <ul>
            {JSON.parse(item.ingredients_names).map((it, j) => (
              <li key={j}>{it}</li>
            ))}
          </ul>
          <span
            type="button"
            className="delete-item-shoppinglist-mobile"
            onClick={() => deleteShoppingListItemById(item.shoppingList_id)}
          >
            Löschen
          </span>
        </div>
      )}
    </>
  );
};
