import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addTripData } from "../../redux/slices/formDataSlice";

const placesKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

const SelectPlace = ({ name }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: placesKey,
    libraries: ["places"],
    language: "uk",
  });
  const [place, setPlace] = useState();
  const onPlaceChanged = (name) => {
    // console.log(name);
    const place = inputRef.current.getPlaces();
    const city = place[0].formatted_address;
    setPlace(city);
    dispatch(addTripData({ [name]: city }));
  };

  return (
    <>
      {isLoaded && (
        <StandaloneSearchBox
          onLoad={(ref) => (inputRef.current = ref)}
          onPlacesChanged={() => onPlaceChanged(name)}
          placesOptions={{ types: ["(cities)"] }}
        >
          <input
            type="text"
            className="block w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent/80 transition-all bg-gray-50"
          />
        </StandaloneSearchBox>
      )}
    </>
  );
};

export default SelectPlace;
