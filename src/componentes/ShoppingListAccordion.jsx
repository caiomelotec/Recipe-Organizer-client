import React from "react";
import { AccordionSection } from "./AccordionSection";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";

import axios from "axios";

export const ShoppingListAccordion = () => {
  const { currentUser } = useAuthStore((state) => ({
    currentUser: state.currentUser || null,
  }));

  const [activeIndex, setActiveIndex] = useState(null);

  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    const fetchShoppingListByUserId = async () => {
      const authToken = currentUser.token;
      try {
        const res = await axios.get(
          "https://koch-8dbe7c0d957c.herokuapp.com/getshoppinglistinfo",
          {
            withCredentials: true,
            headers: {
              Authorization: authToken,
            },
          }
        );
        setShoppingList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchShoppingListByUserId();
  }, []);

  let recipes = shoppingList ? shoppingList : null;

  return (
    <>
      {shoppingList == null || shoppingList.length == 0 ? (
        <h3>Deine Einkaufsliste is leer 😥</h3>
      ) : (
        recipes.map((item, i) => (
          <div className="shoppingliste-info-div" key={i}>
            <AccordionSection
              item={item}
              key={item.shoppingList_id}
              isActiveSection={activeIndex === i}
              setActiveIndex={setActiveIndex}
              activeIndex={activeIndex}
              sectionIndex={i}
            />
          </div>
        ))
      )}
    </>
  );
};
