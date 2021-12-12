import "../styles/globals.css";
import { FirestoreDBProvider } from "../firebase/firestoreContext";
import { UserProvider } from "../context/userContext";
import { StorageProvider } from "../firebase/storageContext";
function MyApp({ Component, pageProps }) {
  return (
    <div className="font-Montserrat">
      <FirestoreDBProvider>
        <UserProvider>
          <StorageProvider>
            <Component {...pageProps} />
          </StorageProvider>
        </UserProvider>
      </FirestoreDBProvider>
    </div>
  );
}

export default MyApp;
