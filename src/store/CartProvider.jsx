import { useReducer, useEffect } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const existingCartItemIndex = state.items.findIndex((item) => {
        return item.id === action.item.id
      });
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount
        }
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }

      const updatedTotalAmount = updatedItems.reduce(
        (currentAmount, item) => {
          return currentAmount + item.price * item.amount
        }, 0
      );
      return { items: updatedItems, totalAmount: updatedTotalAmount };
    }
    case 'REMOVE': {
      const existingCartItemIndex = state.items.findIndex((item) => {
        return item.id === action.item.id
      });
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      if (existingCartItem.amount <= 1)
      {
        updatedItems = state.items.filter(item => item.id !== action.item.id);
      } else {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount - 1
        }
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      const updatedTotalAmount = updatedItems.reduce(
        (currentAmount, item) => {
          return currentAmount + item.price * item.amount
        }, 0
      );
      return { items: updatedItems, totalAmount: updatedTotalAmount };
    }
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeItemCartHandler = (item) => {
    dispatchCartAction({ type: 'REMOVE', item: item });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemCartHandler,
    removeItem: removeItemCartHandler
  }
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
