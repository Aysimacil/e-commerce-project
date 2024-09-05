import { useDispatch, useSelector } from 'react-redux';
import {
  CALCULATE_TOTAL_ORDER_AMOUNT,
  editOrderSuccess,
  fetchFail,
  fetchOrdersSuccess,
  fetchStart,
  saveOrderSuccess,
} from '../features/orderSlice';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { CLEAR_CART } from '../features/cartSlice';
import { toastErrorNotify, toastSuccessNotify } from '../helpers/ToastNotify';
import { useNavigate } from 'react-router-dom';

const useOrderCalls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.auth);
  const { cartTotalAmount, cartItems } = useSelector((state) => state.cart);
  const { shippingAddress } = useSelector((state) => state.checkout);

  const saveOrder = async () => {
    dispatch(fetchStart());

    const date = new Date().toDateString();
    const time = new Date().toLocaleTimeString();
    const orderConfig = {
      userID: currentUser?.userID,
      email: currentUser?.email,
      orderDate: date,
      orderTime: time,
      orderAmount: cartTotalAmount,
      orderStatus: 'Order Placed...',
      cartItems,
      shippingAddress,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      await addDoc(collection(db, 'orders'), orderConfig);
      dispatch(saveOrderSuccess());
      dispatch(CLEAR_CART());
      toastSuccessNotify('Order saved');
      navigate('/checkout-success');
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(error.message);
    }
  };

  const getOrders = () => {
    dispatch(fetchStart());

    try {
      const docRef = collection(db, 'orders');
      const q = query(docRef, orderBy('createdAt', 'desc'));
      onSnapshot(q, (snapshot) => {
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(fetchOrdersSuccess(allData));
      });
    } catch (error) {
      dispatch(fetchFail());
      console.log(error.message);
    }
  };

  const calculateTotalOrderAmount = () => {
    dispatch(CALCULATE_TOTAL_ORDER_AMOUNT());
  };

  const editOrder = async (id, order, status) => {
    dispatch(fetchStart());

    const orderConfig = {
      userID: order.userID,
      email: order.email,
      orderDate: order.orderDate,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      editedAt: Timestamp.now().toDate(),
    };
    try {
      await setDoc(doc(db, 'orders', id), orderConfig);
      dispatch(editOrderSuccess());
      toastSuccessNotify('Order status changed successfully');
      navigate('/admin/orders');
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(error.message);
    }
  };

  return { saveOrder, getOrders, calculateTotalOrderAmount, editOrder };
};

export default useOrderCalls;
