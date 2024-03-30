import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice'; // Import user reducer
import cartReducer from './features/cart/cartSlice'; // Import cart reducer

// Configure Redux store
const store = configureStore({
  reducer: {
    user: userReducer, // Add user reducer to the store
    cart: cartReducer, // Add cart reducer to the store
  },
});

export default store; // Export the configured store
