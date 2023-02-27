import { useAppDispatch, useAppSelector } from "./hooks";
import { projectFirestore, timestamp } from "../firebase/config";
import firebase from "firebase/app";
import { Transactions } from "../redux/transactionSlice";
import { addTransaction } from "../redux/transactionSlice";

export interface DocProps {
  id?: string;
  userId?: string;
  name?: string;
  amount?: number;
}

export const useFirestore = () => {
  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();
  const collection = "transactions";

  const addDoc = async (doc: DocProps) => {
    const createdAt = timestamp.fromDate(new Date());

    doc.id = projectFirestore.collection(collection).doc().id;

    if (user.firebaseData) {
      doc.userId = user.firebaseData.uid;
    }

    await projectFirestore.collection(collection).add({ ...doc, createdAt });
    dispatch(addTransaction({ ...doc, createdAt }));
  };

  const deleteDoc = (doc: firebase.firestore.DocumentData) => {
    const id: string = doc.id;

    projectFirestore.collection(collection).doc(id).delete();
  };

  const updateDoc = (doc: firebase.firestore.DocumentData) => {
    const id: string = doc.id;

    projectFirestore.collection(collection).doc(id).update(doc);
  };

  const getTransactions = async () => {
    if (!user.firebaseData) return;
    const userId = user.firebaseData.uid;

    const snapshot = await projectFirestore.collection(collection).get();

    const transactions: Transactions[] = snapshot.docs
      .filter((doc) => doc.data().userId === userId)
      .map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

    return transactions;
  };

  return { addDoc, deleteDoc, updateDoc, getTransactions };
};
