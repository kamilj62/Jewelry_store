"use client";

import { createContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products.js";

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

const initialCartState = { items: [] };

function shoppingCartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );

    if (existingCartItemIndex !== -1) {
      // Item already exists, update quantity
      updatedItems[existingCartItemIndex] = {
        ...updatedItems[existingCartItemIndex],
        quantity: updatedItems[existingCartItemIndex].quantity + 1,
      };
    } else {
      // Find the product from DUMMY_PRODUCTS
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      );

      if (!product) {
        console.warn(`Product with id ${action.payload} not found.`);
        return state;
      }

      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    if (updatedItemIndex === -1) {
      console.warn(
        `Item with id ${action.payload.productId} not found in cart.`
      );
      return state;
    }

    const updatedItem = { ...updatedItems[updatedItemIndex] };
    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  return state;
}

export default function CartContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    initialCartState
  );

  function handleAddItemToCart(id) {
    shoppingCartDispatch({ type: "ADD_ITEM", payload: id });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: "UPDATE_ITEM",
      payload: { productId, amount },
    });
  }

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
