import { useDispatch, useSelector } from "react-redux";
import { TRAVELER_OPTIONS } from "../../../public/data";
import { selectTravelers } from "../../redux/selectors";
import { addFormData } from "../../redux/slices/formDataSlice";

const SelectTravelers = () => {
  const dispatch = useDispatch();
  const budget = useSelector(selectTravelers);

  const handleInputChange = (travelers) => {
    dispatch(
      addFormData({
        travelers: travelers,
      }),
    );
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
      {TRAVELER_OPTIONS.map((opt) => (
        <button
          key={opt.id}
          onClick={() => handleInputChange(opt.id)}
          className={`p-4 cursor-pointer rounded-xl border-2 transition-all flex-center flex-col ${budget === opt.id ? "border-accent bg-secondary-foreground shadow-md scale-105" : "border-gray-200 hover:border-secondary"}`}
        >
          <div className="text-3xl">{opt.icon}</div>
          <h5 className="font-bold">{opt.title}</h5>
          <p className="text-sm text-gray-600">{opt.desc}</p>
        </button>
      ))}
    </div>
  );
};

export default SelectTravelers;
