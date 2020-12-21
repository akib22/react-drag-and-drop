import { configureStore, createSlice } from '@reduxjs/toolkit';
import update from 'immutability-helper';
import { loadState, saveState } from '../utils/localStorage';

const initialState = {
  loading: false,
  hasError: false,
  images: [],
  droppedImages: [],
  modalInfo: {
    showModal: false,
    imageId: null,
  },
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
      const styles = {
        blur: 0,
        brightness: 1,
        contrast: 1,
      };
      state.droppedImages.push({ ...action.payload, styles });
      // save data in local storage
      saveState(state.droppedImages);
    },
    removeDroppedImg: (state, { payload }) => {
      state.droppedImages = state.droppedImages.filter((item, idx) => idx !== payload.index);
      // save data in local storage
      saveState(state.droppedImages);
    },
    sortImage: (state, { payload }) => {
      const draggedImg = state.droppedImages[payload.dragIndex];
      state.droppedImages = update(state.droppedImages, {
        $splice: [
          [payload.dragIndex, 1],
          [payload.hoverIndex, 0, draggedImg],
        ],
      });
      // save data in local storage
      saveState(state.droppedImages);
    },
    updateImgStyles: (state, { payload }) => {
      state.droppedImages[payload.index].styles = {
        ...state.droppedImages[payload.index].styles,
        ...payload.val,
      };
      // save data in local storage
      saveState(state.droppedImages);
    },
    showModal: (state, { payload }) => {
      state.modalInfo.imageId = payload.imageId;
      state.modalInfo.showModal = true;
    },
    closeModal: (state) => {
      state.modalInfo.imageId = null;
      state.modalInfo.showModal = false;
    },
    updateImage: (state, { payload }) => {
      state.droppedImages[state.modalInfo.imageId].imgSrc = payload.imgSrc;
      state.modalInfo.imageId = null;
      state.modalInfo.showModal = false;
      // save data in local storage
      saveState(state.droppedImages);
    },
    loadDataFromLocalStorage: (state) => {
      const data = loadState();
      if (!data) return;
      state.droppedImages = data;
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
  updateImgStyles,
  showModal,
  closeModal,
  updateImage,
  loadDataFromLocalStorage,
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
