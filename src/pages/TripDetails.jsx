import { useParams } from "react-router-dom";

const TripDetails = () => {
  const { tripId } = useParams();
  return <div>TripDetails {tripId}</div>;
};

export default TripDetails;
