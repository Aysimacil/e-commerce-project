import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  loading: false,
  error: false,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    addProductSuccess: (state) => {
      state.loading = false;
    },
    editProductSuccess: (state) => {
      state.loading = false;
    },
    deleteProductSuccess: (state) => {
      state.loading = false;
    },
    getProductsSuccess: (state, { payload }) => {
      state.loading = false;
      state.products = payload;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  addProductSuccess,
  editProductSuccess,
  deleteProductSuccess,
  getProductsSuccess,
  fetchFail,
} = productSlice.actions;

export default productSlice.reducer;
