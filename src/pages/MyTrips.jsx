import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { useUser } from "@clerk/react";
import { useEffect, useState } from "react";
import MyTripCard from "../components/common/MyTripCard";
import { Skeleton } from "@/components/ui/skeleton";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyTrips = () => {
  const [userTrips, setUserTrips] = useState([]);
  const navigate = useNavigate();
  const { user } = useUser();

  const getUserTrips = async () => {
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    console.log(userEmail);
    const q = query(
      collection(db, "trips"),
      where("userEmail", "==", userEmail),
    );

    try {
      const querySnapshot = await getDocs(q);

      const allTrips = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserTrips(allTrips);
      //   console.log(allTrips);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    user && getUserTrips();
  }, [user]);

  return (
    <div className="bg-secondary-foreground min-h-screen">
      <div className="max-padd-container py-30">
        <button
          onClick={() => navigate("/create-trip")}
          className="mb-10 flex-center gap-2 cursor-pointer text-sm text-white bg-accent px-4 py-1 rounded-full hover:bg-secondary transition-colors"
        >
          <FaArrowLeft /> Створити іншу подорож
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {userTrips?.length > 0
            ? userTrips?.map((trip, index) => (
                <MyTripCard key={index} trip={trip} />
              ))
            : [1, 2, 3, 4].map((index) => (
                <div key={index} className="flex flex-col space-y-3">
                  <Skeleton className="h-122 w-77 rounded-xl bg-white" />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default MyTrips;
