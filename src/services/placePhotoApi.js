import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";
const placeApiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": placeApiKey,
    "X-Goog-FieldMask": ["places.photos", "places.displayName", "places.id"],
  },
};
const getPlaceDetails = async (data) =>
  await axios.post(BASE_URL, data, config);
export const getPlacePhoto = async (textQuery) => {
  if (!textQuery) return null;
  const res = await getPlaceDetails({ textQuery });
  const photoName = res?.data?.places[0]?.photos[4]?.name;

  if (!photoName) return null;
  const photoUrl = `https://places.googleapis.com/v1/${photoName}/media?key=${placeApiKey}&maxHeightPx=1080&maxWidthPx=1920`;
  return photoUrl;
  //   console.log(res?.data);
};
