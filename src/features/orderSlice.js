import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: false,
  totalOrderAmount: null,
  orderHistory: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchOrdersSuccess: (state, { payload }) => {
      state.orderHistory = payload;
      state.loading = false;
    },
    saveOrderSuccess: (state) => {
      state.loading = false;
    },
    editOrderSuccess: (state) => {
      state.loading = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    CALCULATE_TOTAL_ORDER_AMOUNT: (state) => {
      const array = [];
      state.orderHistory.map((item) => array.push(item.orderAmount));
      state.totalOrderAmount = array.reduce((a, b) => a + b, 0);
    },
  },
});

export const {
  fetchStart,
  fetchOrdersSuccess,
  saveOrderSuccess,
  editOrderSuccess,
  fetchFail,
  CALCULATE_TOTAL_ORDER_AMOUNT,
} = orderSlice.actions;

export default orderSlice.reducer;
