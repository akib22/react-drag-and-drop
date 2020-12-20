import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  hasError: false,
  images: [],
  droppedImages: [],
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    getImages: (state) => {
      state.loading = true;
    },
    getImagesSuccess: (state, action) => {
      state.images = action.payload;
      state.loading = false;
      state.hasError = false;
    },
    getImagesFailed: (state) => {
      state.loading = false;
      state.hasError = true;
    },
  },
});

const imageReducer = imageSlice.reducer;

const store = configureStore({
  reducer: {
    image: imageReducer,
  },
});

export const { getImages, getImagesSuccess, getImagesFailed } = imageSlice.actions;

export const selector = (state) => state.image;

export const fetchImages = () => async (dispatch) => {
  dispatch(getImages());
  try {
    const response = await fetch('https://www.breakingbadapi.com/api/characters?limit=20');
    const data = await response.json();
    dispatch(getImagesSuccess(data));
  } catch (error) {
    dispatch(getImagesFailed());
  }
};

export default store;
