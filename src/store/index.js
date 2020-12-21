import { configureStore, createSlice } from '@reduxjs/toolkit';
import update from 'immutability-helper';

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
    dropImage: (state, action) => {
      if (state.droppedImages.length === 9) return;
      state.droppedImages.push({ ...action.payload, styles: {} });
    },
    removeDroppedImg: (state, action) => {
      state.droppedImages = state.droppedImages.filter((item) => item.id !== action.payload.id);
    },
    sortImage: (state, { payload }) => {
      const draggedImg = state.droppedImages[payload.dragIndex];
      state.droppedImages = update(state.droppedImages, {
        $splice: [
          [payload.dragIndex, 1],
          [payload.hoverIndex, 0, draggedImg],
        ],
      });
    },
  },
});

const imageReducer = imageSlice.reducer;

const store = configureStore({
  reducer: {
    image: imageReducer,
  },
});

export const {
  getImages,
  getImagesSuccess,
  getImagesFailed,
  dropImage,
  sortImage,
  removeDroppedImg,
} = imageSlice.actions;

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
