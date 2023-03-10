import { useAppSelector } from "./hooks";
import { projectFirestore, timestamp } from "../firebase/config";
import { Transaction } from "../redux/transactionSlice";
import { useState } from "react";

export interface DocProps {
  id?: string;
  userId?: string;
  name?: string;
  amount?: number;
}

export const useFirestore = () => {
  const user = useAppSelector((state) => state.user.user);
  const [error, setError] = useState<string | null>("");

  const collection = "transactions";

  const addDoc = async (doc: DocProps) => {
    const createdAt = timestamp.fromDate(new Date());

    // doc.id = projectFirestore.collection(collection).doc().id;

    if (user.firebaseData) {
      doc.userId = user.firebaseData.uid;
    }

    const temp = await projectFirestore
      .collection(collection)
      .add({ ...doc, createdAt });

    return temp.id;
  };

  const deleteDoc = (id: string) => {
    projectFirestore.collection(collection).doc(id).delete();
  };

  const getTransactions = async () => {
    try {
      if (!user.firebaseData) return;
      const userId = user.firebaseData.uid;

      const snapshot = await projectFirestore
        .collection(collection)
        .where("userId", "==", userId)
        .orderBy("createdAt", "desc")
        .get();

      const transactions: Transaction[] = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      setError(null);
      return transactions;
    } catch (err: any) {
      setError(err.message);
      console.log(err);
    }
  };

  return { error, addDoc, deleteDoc, getTransactions };
};
