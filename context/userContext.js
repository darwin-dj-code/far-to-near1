import { createContext, useContext, useState, useEffect } from "react";

const userContext = createContext();

export const UserProvider = (props) => {
  const [userId, setUserId] = useState();
  useEffect(() => {
    if (window) {
      const id = window.sessionStorage.getItem("id");
      setUserId(id);
    }
  }, []);
  return (
    <userContext.Provider value={userId}>{props.children}</userContext.Provider>
  );
};

export const useUser = () => {
  return useContext(userContext);
};
