import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; // Importing createAsyncThunk and createSlice functions from Redux Toolkit
import { getAddress } from '../../services/apiGeocoding'; // Importing getAddress function from apiGeocoding service

// Function to get user's geolocation position
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject); // Using Geolocation API to get current position
  });
}

// Async thunk to fetch user's address
export const fetchAddress = createAsyncThunk(
  'user/fetchAddress', // Action type prefix
  async function () {
    // 1) Getting the user's geolocation position
    const positionObj = await getPosition(); // Waiting for the position promise to resolve
    const position = {
      latitude: positionObj.coords.latitude, // Extracting latitude from position object
      longitude: positionObj.coords.longitude, // Extracting longitude from position object
    };

    // 2) Using reverse geocoding API to get a description of the user's address
    const addressObj = await getAddress(position); // Getting address based on position
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`; // Combining address components

    // 3) Returning an object with the data we are interested in
    // Payload of the FULFILLED state
    return { position, address };
  }
);

// Initial state for user slice
const initialState = {
  username: '', // User's username
  status: 'idle', // Status of address fetching
  position: {}, // User's geolocation position
  address: '', // User's address
  error: '', // Error message
};

// User slice creation
const userSlice = createSlice({
  name: 'user', // Slice name
  initialState, // Initial state
  reducers: {
    // Reducer to update user's name
    updateName(state, action) {
      state.username = action.payload; // Updating username in state
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = 'loading'; // Setting status to loading while fetching address
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position; // Setting user's position in state
        state.address = action.payload.address; // Setting user's address in state
        state.status = 'idle'; // Resetting status to idle after fetching address
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error'; // Setting status to error if fetching address fails
        state.error =
          'There was a problem getting your address. Make sure to fill this field!'; // Setting error message
      }),
});

// Exporting actions from user slice
export const { updateName } = userSlice.actions;

// Exporting user reducer
export default userSlice.reducer;
