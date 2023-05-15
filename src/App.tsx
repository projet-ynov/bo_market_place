import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainRoutes from "./services/Routes/routes";
import ConnexionRoutes from "./services/Routes/connexionRoutes";
import Notifications from "./composants/notifications/notifications";
import io from 'socket.io-client';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/authentification/connexion" />} />
        <Route path="/authentification/*" element={<ConnexionRoutes />} />
        <Route path="/app/*" element={<MainRoutes />} />
        <Route path="/notifications/*" element={<Notifications />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
