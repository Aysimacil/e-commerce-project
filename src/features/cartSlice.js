import { createSlice } from '@reduxjs/toolkit';
import { toastInfoNotify, toastSuccessNotify } from '../helpers/ToastNotify';

const initialState = {
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    ADD_TO_CART: (state, { payload }) => {
      const productIndex = state.cartItems.findIndex((item) => item.id === payload.id);

      if (productIndex >= 0) {
        state.cartItems[productIndex].cartQuantity += 1;
        toastInfoNotify(`${payload.name} increased by one. `);
      } else {
        const currentProduct = { ...payload, cartQuantity: 1 };
        state.cartItems.push(currentProduct);
        toastSuccessNotify(`${payload.name} added to cart. `);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    DECREASE_CART: (state, { payload }) => {
      const productIndex = state.cartItems.findIndex((item) => item.id === payload.id);

      if (state.cartItems[productIndex].cartQuantity > 1) {
        (state.cartItems[productIndex].cartQuantity -= 1),
          toastInfoNotify(`${payload.name} decreased by one`);
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        const newCartItems = state.cartItems.filter((item) => item.id !== payload.id);

        state.cartItems = newCartItems;
        toastSuccessNotify(`${payload.name} removed from cart`);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    REMOVE_FROM_CART: (state, { payload }) => {
      const newCartItems = state.cartItems.filter((item) => item.id !== payload.id);

      state.cartItems = newCartItems;
      toastSuccessNotify(`${payload.name} removed from cart`);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    CLEAR_CART: (state) => {
      state.cartItems = [];
      toastInfoNotify(`Cart cleared`);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    CALCULATE_SUBTOTAL: (state) => {
      const array = [];
      state.cartItems.map((item) => array.push(item.price * item.cartQuantity));

      state.cartTotalAmount = array.reduce((a, b) => a + b, 0);
    },
    CALCULATE_TOTAL_QUANTITY: (state) => {
      const array = [];
      state.cartItems.map((item) => array.push(item.cartQuantity));

      state.cartTotalQuantity = array.reduce((a, b) => a + b, 0);
    },
  },
});

export const {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
} = cartSlice.actions;

export default cartSlice.reducer;
