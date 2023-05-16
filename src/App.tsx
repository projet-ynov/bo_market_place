import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainRoutes from "./services/Routes/routes";
import ConnexionRoutes from "./services/Routes/connexionRoutes";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/authentification/connexion" />} />
          <Route path="/authentification/*" element={<ConnexionRoutes />} />
          <Route path="/app/*" element={<MainRoutes />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
