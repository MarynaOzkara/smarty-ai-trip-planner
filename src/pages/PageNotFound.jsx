import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-secondary-foreground min-h-screen flex-center">
      <div>
        <h2 className="text-center mb-10">Cторінку не знайдено</h2>
        <div className="pt-10 gap-4 flex flex-col md:flex-row">
          <Button
            onClick={() => navigate("/create-trip")}
            className="py-6 px-10 cursor-pointer hover:bg-secondary text-xl"
          >
            Створити подорож
          </Button>
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="py-6 px-10 cursor-pointer text-xl flex items-center gap-4"
          >
            Повернутись на головну
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
