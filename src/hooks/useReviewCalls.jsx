import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { db } from '../firebase/config';
import { toastErrorNotify, toastSuccessNotify } from '../helpers/ToastNotify';
import { useNavigate } from 'react-router-dom';

const useReviewCalls = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const submitReview = async (id, rate, review) => {
    const date = new Date().toDateString();
    const reviewConfig = {
      userID: currentUser?.userID,
      displayName: currentUser?.displayName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };
    try {
      await addDoc(collection(db, 'reviews'), reviewConfig);
      toastSuccessNotify('Review submitted succesfully');
      navigate(-1);
    } catch (error) {
      toastErrorNotify(error.message);
    }
  };
  return { submitReview };
};

export default useReviewCalls;
