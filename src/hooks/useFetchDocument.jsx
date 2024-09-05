import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useEffect, useState } from 'react';
import { toastErrorNotify } from '../helpers/ToastNotify';
import { useNavigate } from 'react-router-dom';

const useFetchDocument = (collectionName, documentID) => {
  const [document, setDocument] = useState(null);
  const navigate = useNavigate();

  const getDocument = async () => {
    const docRef = doc(db, collectionName, documentID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const obj = {
        id: documentID,
        ...docSnap.data(),
      };
      setDocument(obj);
    } else {
      toastErrorNotify('Document not found');
      navigate('/');
    }
  };
  useEffect(() => {
    getDocument();
  }, []);

  return { document };
};

export default useFetchDocument;
