import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shippingAddress: {},
  billingAddress: {},
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    SAVE_SHIPPING_ADDRESS: (state, { payload }) => {
      state.shippingAddress = payload;
    },
    SAVE_BILLING_ADDRESS: (state, { payload }) => {
      state.billingAddress = payload;
    },
  },
});

export const { SAVE_SHIPPING_ADDRESS, SAVE_BILLING_ADDRESS } = checkoutSlice.actions;

export default checkoutSlice.reducer;
