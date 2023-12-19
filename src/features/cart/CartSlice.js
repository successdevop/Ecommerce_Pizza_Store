import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {},
    removeFromCart: (state, action) => {},
    orderPizza: (state, action) => {},
    clearCart: (state) => {},
  },
});

export const { addToCart, removeFromCart, clearCart, orderPizza } =
  cartSlice.actions;
export default cartSlice.reducer;
