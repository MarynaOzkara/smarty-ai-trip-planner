import { Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Home from "./pages/Home";
import CreateTrip from "./pages/CreateTrip";

import SelectPlace from "./components/common/SelectPlace";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/place" element={<SelectPlace />} />
      </Routes>
    </>
  );
};

export default App;
