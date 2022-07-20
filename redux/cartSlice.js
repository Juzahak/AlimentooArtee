import { createSlice } from "@reduxjs/toolkit";

let guid = () => {
  let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    removeProduct: (state, action) => {
      console.log(action.payload)
      const itemId = action.payload.cartId
      state.products = state.products.filter(((item) => item.cartId !== itemId));
      state.quantity -= 1;
      state.total -= action.payload.price * action.payload.quantity;
    },
    addProduct: (state, action) => {
      const newProduct = {
        ...action.payload,
        cartId: guid()
      }
      state.products.push(newProduct);
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
