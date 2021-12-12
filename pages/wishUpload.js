import { useState } from "react";
import { useUser } from "../context/userContext";
import { useFirestoreDB } from "../firebase/firestoreContext";

import { useRouter } from "next/router";

const WishUpload = () => {
  const [wish, setWish] = useState();
  const [bestAbout, setBestAbout] = useState();

  const { updateData } = useFirestoreDB();

  const id = useUser();

  const router = useRouter();

  const uploadAll = () => {
    updateData("invitation", id, {
      wish,
      bestAbout,
    });
    router.push("/completed");
  };

  return (
    <div
      className={
        "flex justify-center items-center min-h-screen  p-3  bg-blue-500 text-gray-700"
      }
    >
      <div className="  bg-blue-200 rounded-md p-2  flex flex-col text-xl font-semibold">
        <h1 className="p-2 text-center text-3xl font-semibold">Your Wish</h1>
        <div className="p-2 self-center flex flex-col ">
          <label className="pb-1">Your wishes </label>
          <textarea
            className=" text-base  w-72 h-32 pl-2 rounded-sm border-2 border-blue-100 focus:border-blue-500 "
            type="text"
            onChange={(e) => setWish(e.target.value)}
          />
          <div
            className="mt-1 text-xs 
text-gray-500"
          >
            Enter your wishes to birthday baby
          </div>
        </div>
        <div className="p-2 self-center flex flex-col">
          <label className="pb-1">Enter the best</label>
          <textarea
            className=" text-base pl-2  w-72 h-44 rounded-sm  border-2 border-blue-100 focus:border-blue-500 "
            type="text"
            onChange={(e) => setBestAbout(e.target.value)}
          />
          <div
            className="mt-1 text-xs 
text-gray-500 w-72"
          >
            Best and appreciative things about birthday baby
          </div>
        </div>
        <button
          className="p-2 mb-3 text-gray-100 rounded-lg bg-blue-500 w-min self-center"
          onClick={() => uploadAll()}
        >
          submit
        </button>
      </div>
    </div>
  );
};

export default WishUpload;
