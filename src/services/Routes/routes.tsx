import { Route, Routes } from "react-router-dom";
import Header from "../../composants/header/header";
import Users from "../../composants/users/users";
import Tickets from "../../composants/tickets/tickets";

function MainRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/users/*" element={<Users />} />
        <Route path="/tickets/*" element={<Tickets />} />
      </Routes>
    </>
  );
};

export default MainRoutes;

