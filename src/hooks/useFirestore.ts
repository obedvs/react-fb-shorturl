import { nanoid } from "nanoid";
import { useState } from "react";
import { collection, deleteDoc, doc, DocumentData, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore/lite";

import { db, auth } from "@/firebase";
import { FirebaseError } from "firebase/app";

export const useFirestore = () => {

  const [data, setData] = useState<DocumentData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<Record<string, boolean>>({
    getData: false,
    addData: false,
    updateData: false
  });

  const getData = async () => {
    try {
      setLoading(prev => ({ ...prev, getData: true }));
      const uid = auth.currentUser?.uid;
      if (!uid) {
        throw new Error("User not authenticated");
      }
      const q = query(collection(db, "urls"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      const dataDB = querySnapshot.docs.map(doc => doc.data());
      setData(dataDB);

    } catch (error) {
      console.log(error)
      if (error instanceof Error) {
        setError(error.message);
      } else if (error instanceof FirebaseError) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }

    } finally {
      setLoading(prev => ({ ...prev, getData: false }));
    }

  };

  const addData = async (url: string) => {
    try {
      setLoading(prev => ({ ...prev, addData: true }));
      const newDoc = {
        enabled: true,
        nanoid: nanoid(6),
        origin: url,
        uid: auth.currentUser?.uid
      };
      const docRef = doc(db, "urls", newDoc.nanoid);
      await setDoc(docRef, newDoc);

      setData([...data, newDoc]);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else if (error instanceof FirebaseError) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }


    } finally {
      setLoading(prev => ({ ...prev, addData: false }));
    }
  }

  const deleteData = async (nanoid: string) => {
    try {
      setLoading(prev => ({ ...prev, [nanoid]: true }));
      const docRef = doc(db, "urls", nanoid);
      await deleteDoc(docRef);
      setData(data.filter(item => item.nanoid !== nanoid));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else if (error instanceof FirebaseError) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }

    } finally {
      setLoading(prev => ({ ...prev, [nanoid]: false }));
    }

  }

  const updateData = async (nanoid: string, newOrigin: string) => {
    try {
      setLoading(prev => ({ ...prev, updateData: true }));
      const docRef = doc(db, "urls", nanoid);
      await updateDoc(docRef, { origin: newOrigin });
      setData(data.map(item => item.nanoid === nanoid ? { ...item, origin: newOrigin } : item));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else if (error instanceof FirebaseError) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(prev => ({ ...prev, updateData: false }));
    }

  }

  const searchData = async (nanoid: string) => {
    try {
      const docRef = doc(db, "urls", nanoid);
      const docSnap = await getDoc(docRef);
      return docSnap
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else if (error instanceof FirebaseError) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  }

  return { data, error, loading, getData, addData, deleteData, updateData, searchData };
};
