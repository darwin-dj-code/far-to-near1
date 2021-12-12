import { createContext, useContext, useState } from "react";
import { storage } from "../firebase/firebaseInit";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useUser } from "../context/userContext";
import { useFirestoreDB } from "../firebase/firestoreContext";

const StorageContext = createContext();

export const StorageProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [fileURL, setFileURL] = useState();
  const [fileURLs, setFileURLs] = useState([]);

  const id = useUser();

  const [pathName, SetPathName] = useState();

  const { updateData } = useFirestoreDB();

  const uploadFile = (file, path) => {
    if (!file) return;

    SetPathName(path);
    const storageRef = ref(storage, `/${path}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFileURL(downloadURL)
        );
      }
    );
  };
  if (fileURL) {
    const updateUserData = (path) => {
      updateData("invitation", id, {
        [path]: fileURL,
      });
    };
    updateUserData(pathName);
    setFileURL(null);
  }

  const uploadFileAndGetURLs = (file, path) => {
    const storageRef = ref(storage, `/${path}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFileURLs((fileURLs) => [...fileURLs, downloadURL])
        );
      }
    );
  };

  const updateMultipleFiles = (files, path) => {
    if (!files) return;
    SetPathName(path);
    files.forEach((file) => uploadFileAndGetURLs(file, path));
    updateData("invitation", id, {
      [path]: fileURLs,
    });
  };

  return (
    <StorageContext.Provider
      value={{ uploadFile, updateMultipleFiles, progress }}
    >
      {children}
    </StorageContext.Provider>
  );
};

export const useStorageContext = () => {
  return useContext(StorageContext);
};
