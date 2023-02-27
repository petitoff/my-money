import { useAppDispatch } from "./hooks";
import { projectFirestore, timestamp } from "../firebase/config";
import {
  addFirestoreData,
  updateFirestoreData,
  deleteFirestoreData,
} from "../redux/userSlice";
import firebase from "firebase/app";

interface DocProps {
  id?: string;
  userId?: string;
  name: string;
  amount: number;
}

export const useFirestore = () => {
  const dispatch = useAppDispatch();
  const collection = "transactions";

  const addDoc = async (doc: DocProps) => {
    const createdAt = timestamp.fromDate(new Date());

    doc.id = projectFirestore.collection(collection).doc().id;

    // get user id
    const user = firebase.auth().currentUser;
    if (user) {
      doc.userId = user.uid;
    }

    await projectFirestore.collection(collection).add({ ...doc, createdAt });
    dispatch(addFirestoreData(doc));
  };

  const deleteDoc = (doc: firebase.firestore.DocumentData) => {
    const id: string = doc.id;

    projectFirestore.collection(collection).doc(id).delete();
    dispatch(deleteFirestoreData(doc));
  };

  const updateDoc = (doc: firebase.firestore.DocumentData) => {
    const id: string = doc.id;

    projectFirestore.collection(collection).doc(id).update(doc);
    dispatch(updateFirestoreData(doc));
  };

  return { addDoc, deleteDoc, updateDoc };
};
