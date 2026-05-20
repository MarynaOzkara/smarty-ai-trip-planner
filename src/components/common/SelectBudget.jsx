import { BUDGET_OPTIONS } from "../../../public/data";
import { useDispatch, useSelector } from "react-redux";
import { selectBudget } from "../../redux/selectors";
import { addTripData } from "../../redux/slices/formDataSlice";

const SelectBudget = () => {
  const dispatch = useDispatch();
  const budget = useSelector(selectBudget);

  const handleInputChange = (budget) => {
    dispatch(
      addTripData({
        budget: budget,
      }),
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pt-2">
      {BUDGET_OPTIONS.map((opt) => (
        <button
          key={opt.id}
          onClick={() => handleInputChange(opt.id)}
          className={`p-4 cursor-pointer rounded-xl border-2 transition-all flex-center flex-col gap-3 ${budget === opt.id ? "border-accent bg-secondary-foreground shadow-md scale-102 lg:scale-105" : "border-gray-200 hover:border-secondary"}`}
        >
          <div className="text-3xl">{opt.icon}</div>
          <h5 className="font-bold">{opt.label}</h5>
        </button>
      ))}
    </div>
  );
};

export default SelectBudget;
