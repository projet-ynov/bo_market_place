import { Route, Routes } from "react-router-dom";
import Header from "../../composants/header/header";
import Users from "../../composants/users/users";
import Tickets from "../../composants/tickets/tickets";
import Notifications from "../../composants/notifications/notifications";

function MainRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/users/*" element={<Users />} />
        <Route path="/tickets/*" element={<Tickets />} />
        <Route path="/notifications/*" element={<Notifications />} />
      </Routes>
    </>
  );
};

export default MainRoutes;

