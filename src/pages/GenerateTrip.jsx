import { useState } from "react";
import Loader from "../components/common/Loader";
import { useUser } from "@clerk/react";
import { useSelector } from "react-redux";
import { selectTripData } from "../redux/selectors";

const GenerateTrip = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const tripData = useSelector(selectTripData);
  console.log(tripData);
  console.log(user);
  return (
    <div>
      <Loader />
    </div>
  );
};

export default GenerateTrip;
