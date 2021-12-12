import React, { useContext } from "react";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { firestoreDB } from "./firebaseInit";

const FirestoreDBContext = React.createContext();

export function FirestoreDBProvider({ children }) {
  const firestoreRef = firestoreDB;

  const createORWrite = async (collectionName, dataToAdd) => {
    await addDoc(collection(firestoreRef, collectionName), dataToAdd);
  };

  const getData = async (collectionName, id, setState) => {
    const docSnap = await getDoc(doc(firestoreRef, collectionName, id));

    if (docSnap != null && docSnap != undefined) {
      setState(docSnap.data());
    } else {
      console.log(" no doc found");
    }
  };

  const getDataByFieldAndValue = async (
    collectionName,
    fieldName,
    value,
    setState
  ) => {
    let data = [];
    const q = query(
      collection(firestoreRef, collectionName),
      where(fieldName, "==", value)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    setState(data[0]);
  };

  const getAllData = async (collectionName, setState) => {
    const data = [];
    const querySnapshot = await getDocs(
      collection(firestoreRef, collectionName)
    );
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    setState(data);
  };

  const updateData = async (collectionName, id, dataToUpdate) => {
    await updateDoc(doc(firestoreRef, collectionName, id), dataToUpdate);
  };

  const deleteData = async (collectionName, id) => {
    await deleteDoc(doc(firestoreRef, collectionName, id));
  };
  ////////////////////////////////////////////////////////////////////////

  // const createORWrite = (DBname, DBdata) => {
  // const DBref = firebaseDB.ref(DBname);
  // DBref.push(DBdata);
  // };

  // const readAllData = (DBname, setState) => {
  // const DBref = firebaseDB.ref(DBname);
  // DBref.on("value", (snapshot) => {
  // const DBToArray = [];
  // const DBdata = snapshot.val();
  // for (const id in DBdata) {
  // DBToArray.push({ id, ...DBdata[id] });
  // }
  // setState(DBToArray);
  // });
  // };

  // const readSingleData = (DBname, id, setState) => {
  // const DBref = firebaseDB.ref(DBname).child(id);
  // DBref.on("value", (snapshot) => {
  // setState(snapshot.val());
  // });
  // };

  // const updateData = (DBname, id, updatedData) => {
  // const DBref = firebaseDB.ref(DBname).child(id);
  // DBref.update(updatedData);
  // };

  // const deleteData = (DBname, id) => {
  // const DBref = firebaseDB.ref(DBname).child(id);
  // DBref.remove();
  // };

  return (
    <FirestoreDBContext.Provider
      value={{
        createORWrite,
        getAllData,
        getData,
        getDataByFieldAndValue,
        updateData,
        deleteData,
      }}
    >
      {children}
    </FirestoreDBContext.Provider>
  );
}

export const useFirestoreDB = () => {
  return useContext(FirestoreDBContext);
};
