import { Navigate, useRoutes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  const auth = useAuth();
  const isLoggedIn = !!auth?.user;

  const routing = useRoutes([
    { path: "/login", element: <Auth /> },
    { path: "/register", element: <Auth /> },
    { path: "/", element: isLoggedIn ? <Home /> : <Navigate to="/login" /> },
    { path: "*", element: <NotFound /> },
  ]);

  return routing;
}

export default App;
