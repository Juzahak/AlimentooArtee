import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    removeProduct: (state, action) => {
      const itemId = action.payload
      state.products = state.products.filter(((item) => item._id !== itemId));
      
      state.quantity -= 1;
      state.total -= action.payload.price * action.payload.quantity;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += 1;
      state.total += action.payload.price * action.payload.quantity;
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, reset, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
