import { useState, useEffect } from "react";
import { useFirestoreDB } from "../firebase/firestoreContext";
import Image from "next/image";
import Link from "next/link";

const Dashboard = () => {
  const { getAllData } = useFirestoreDB();

  const [allData, setAllData] = useState();

  useEffect(() => {
    getAllData("invitation", setAllData);
  }, []);

  return (
    <div className="bg-blue-50 min-h-screen text-gray-800 ">
      <h1 className="text-4xl text-center font-medium pt-4 ">Wishes From </h1>
      {allData
        ? allData.map((data) => {
            return (
              <Link key={data.id} href={`/wish/${data.id}`}>
                <a className="flex  w-100 h-21 m-4 bg-blue-200 px-3 py-2 rounded-md ">
                  <Image
                    unoptimized
                    height="50"
                    width="50"
                    src={data.profile}
                    className="rounded-full"
                  />
                  <h1 className="self-center text-2xl  ml-4">{data.name}</h1>
                </a>
              </Link>
            );
          })
        : "no data"}
    </div>
  );
};

export default Dashboard;
