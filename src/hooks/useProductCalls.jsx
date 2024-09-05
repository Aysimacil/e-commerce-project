import { useDispatch } from 'react-redux';
import {
  addProductSuccess,
  deleteProductSuccess,
  editProductSuccess,
  fetchFail,
  fetchStart,
  getProductsSuccess,
} from '../features/productSlice';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { db, storage } from '../firebase/config';
import { toastErrorNotify, toastSuccessNotify } from '../helpers/ToastNotify';
import { useNavigate } from 'react-router-dom';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const useProductCalls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addProductToDb = async (product) => {
    dispatch(fetchStart());
    try {
      await addDoc(collection(db, 'products'), {
        name: product.name,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
        imageURL: product.imageURL,
      });
      dispatch(addProductSuccess());
      toastSuccessNotify('Product uploaded successfuly.');
      navigate('/admin/all-products');
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(error.message);
    }
  };

  const addImageToStorage = (file, setUploadProgress, product, setProduct) => {
    const storageRef = ref(storage, `ecommerce/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toastErrorNotify(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toastSuccessNotify('Image uploaded successfully.');
        });
      }
    );
  };

  const getAllProducts = () => {
    dispatch(fetchStart());
    try {
      const docRef = collection(db, 'products');
      const q = query(docRef, orderBy('createdAt', 'desc'));
      onSnapshot(q, (snapshot) => {
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(getProductsSuccess(allData));
      });
    } catch (error) {
      toastErrorNotify(error.message);
      dispatch(fetchFail());
    }
  };

  const deleteProduct = async (id, imageURL) => {
    dispatch(fetchStart());
    try {
      await deleteDoc(doc(db, 'products', id));

      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toastSuccessNotify('Product deleted succesfully.');
      dispatch(deleteProductSuccess());
    } catch (error) {
      toastErrorNotify(error.message);
      dispatch(fetchFail());
    }
  };

  const editProductAtDb = async (id, updatedProduct, oldProduct) => {
    dispatch(fetchStart());

    if (updatedProduct.imageURL !== oldProduct.imageURL) {
      const storageRef = ref(storage, oldProduct.imageURL);
      await deleteObject(storageRef);
    }

    try {
      await setDoc(doc(db, 'products', id), {
        name: updatedProduct.name,
        imageURL: updatedProduct.imageURL,
        price: Number(updatedProduct.price),
        brand: updatedProduct.brand,
        category: updatedProduct.category,
        desc: updatedProduct.desc,
        createdAt: updatedProduct.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      dispatch(editProductSuccess());
      toastSuccessNotify('Product edited succesfully.');
      navigate('/admin/all-products');
    } catch (error) {
      toastErrorNotify(error.message);
      dispatch(fetchFail());
    }
  };

  return { addProductToDb, addImageToStorage, getAllProducts, deleteProduct, editProductAtDb };
};

export default useProductCalls;
