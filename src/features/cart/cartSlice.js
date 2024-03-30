// Importing necessary dependencies
import { createSlice } from '@reduxjs/toolkit'; // Importing createSlice function from Redux Toolkit

// Initial state of the cart
const initialState = {
  cart: [], // Initializing cart as an empty array
};

// Creating a cart slice using createSlice function
const cartSlice = createSlice({
  name: 'cart', // Slice name
  initialState, // Initial state
  reducers: {
    // Reducer to add an item to the cart
    addItem(state, action) {
      // Extracting newItem from action payload and pushing it to the cart array
      state.cart.push(action.payload);
    },
    // Reducer to delete an item from the cart
    deleteItem(state, action) {
      // Filtering out the item with the specified pizzaId from the cart array
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    // Reducer to increase the quantity of an item in the cart
    increaseItemQuantity(state, action) {
      // Finding the item with the specified pizzaId in the cart array
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      // Increasing the quantity of the item by 1 and updating the total price
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    // Reducer to decrease the quantity of an item in the cart
    decreaseItemQuantity(state, action) {
      // Finding the item with the specified pizzaId in the cart array
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      // Decreasing the quantity of the item by 1 and updating the total price
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      // If quantity becomes 0, remove the item from the cart
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    // Reducer to clear the entire cart
    clearCart(state) {
      // Resetting the cart to an empty array
      state.cart = [];
    },
  },
});

// Extracting action creators and reducer from the cart slice
export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

// Exporting the reducer function
export default cartSlice.reducer;

// Selector function to get the entire cart
export const getCart = (state) => state.cart.cart;

// Selector function to get the total quantity of items in the cart
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

// Selector function to get the total price of items in the cart
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

// Selector function to get the quantity of a specific item in the cart by its ID
export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;