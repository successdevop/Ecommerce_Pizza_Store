import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeItemFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    increaseItemQtyInCart: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity = item.quantity + 1;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQtyInCart: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity = item.quantity > 1 ? item.quantity - 1 : item.quantity;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  increaseItemQtyInCart,
  decreaseItemQtyInCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => (sum += item.quantity), 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => (sum += item.totalPrice), 0);
