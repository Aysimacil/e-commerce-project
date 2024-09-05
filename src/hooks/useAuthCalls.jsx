import { auth } from '../firebase/config';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  fetchFail,
  fetchStart,
  isActive,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  resetPasswordSuccess,
} from '../features/authSlice';
import { toastErrorNotify, toastSuccessNotify, toastWarningNotify } from '../helpers/ToastNotify';
import { extractUserNameFromEmail } from '../functions/extractUserNameFromEmail';

const useAuthCalls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (values) => {
    const { email, password } = values;
    dispatch(fetchStart());
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        dispatch(loginSuccess());
        toastSuccessNotify('Login Successful...');
        navigate(-1);
      })
      .catch(() => {
        dispatch(fetchFail());
        toastErrorNotify('Something went wrong !!');
      });
  };

  const register = async (values) => {
    const { email, password } = values;
    dispatch(fetchStart());
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        dispatch(registerSuccess());
        toastSuccessNotify('Registration Successful...');
        navigate('/login');
      })
      .catch(() => {
        dispatch(fetchFail());
        toastErrorNotify('Something went wrong !!');
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch(logoutSuccess());
        navigate('/login');
        toastWarningNotify('You are logged out !!!!');
      })
      .catch(() => toastErrorNotify('Something went wrong !!'));
  };

  const signUpGoogle = async () => {
    const provider = new GoogleAuthProvider();
    dispatch(fetchStart());

    await signInWithPopup(auth, provider)
      .then(() => {
        dispatch(loginSuccess());
        navigate(-1);
        toastSuccessNotify('Login Successful...');
      })
      .catch((err) => {
        dispatch(fetchFail());
        toastErrorNotify(err.message);
      });
  };

  const userObserver = () => {
    dispatch(fetchStart());

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const activeUser = {
          email: user?.email,
          displayName: user?.displayName ?? extractUserNameFromEmail(user?.email),
          photoURL: user?.photoURL,
          userID: user?.uid,
        };
        dispatch(isActive(activeUser));
      } else {
        dispatch(logoutSuccess());
      }
    });
  };

  const resetPassword = (email) => {
    dispatch(fetchStart());
    sendPasswordResetEmail(auth, email)
      .then(() => {
        dispatch(resetPasswordSuccess());
        toastWarningNotify('Please check your mail box!');
      })
      .catch((error) => {
        dispatch(fetchFail());
        toastErrorNotify(error.message);
      });
  };

  return { login, register, logout, signUpGoogle, userObserver, resetPassword };
};

export default useAuthCalls;
