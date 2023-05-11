import { Route, Routes } from "react-router-dom";
import Connexion from "../../composants/connexion/connexion";

function ConnexionRoutes() {
  return (
    <>
      <Routes>
        <Route path="/connexion" element={<Connexion />} />
      </Routes>
    </>
  );
};

export default ConnexionRoutes;
