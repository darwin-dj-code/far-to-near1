import { useState, useEffect } from "react";
import { useFirestoreDB } from "../firebase/firestoreContext";
import { useRouter } from "next/router";

const Login = () => {
  const { getDataByFieldAndValue } = useFirestoreDB();
  const [user, setUser] = useState();
  const [name, setName] = useState();
  const [invitationCode, setInvitationCode] = useState();
  const router = useRouter();

  const checkInvitation = (invitationCode) => {
    console.log("hi");
    getDataByFieldAndValue(
      "invitation",
      "invitationCode",
      invitationCode,
      setUser
    );
    console.log(user);
  };

  useEffect(() => {
    if (user != null && user != undefined) {
      if (window) {
        window.sessionStorage.setItem("id", user.id);
      }
      if (user.name == name) {
        router.push("/mediaUpload");
      }
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center h-screen p-3 bg-blue-500 text-gray-700">
      <div className="bg-blue-200 rounded-md p-2  flex flex-col text-xl font-semibold   ">
        <h1 className="p-2 text-center text-3xl font-semibold">Reception</h1>
        <div className="p-2 self-center flex flex-col">
          <label className="pb-1">Enter your Name</label>
          <input
            className="mb-2 h-9 pl-2 rounded-sm border-2 border-blue-100 focus:border-blue-500 "
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="p-2 self-center flex flex-col">
          <label className="pb-1">Enter Invitation Code</label>
          <input
            className=" pl-2 mb-3 h-9 rounded-sm  border-2 border-blue-100 focus:border-blue-500 "
            type="text"
            onChange={(e) => setInvitationCode(e.target.value)}
          />
        </div>
        <button
          className="p-2 mb-3 text-gray-100 rounded-lg bg-blue-500 w-min self-center"
          onClick={() => checkInvitation(invitationCode)}
        >
          CheckIn
        </button>
      </div>
    </div>
  );
};

export default Login;
