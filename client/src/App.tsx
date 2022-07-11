import { useRoutes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const App = () =>
  useRoutes([
    { path: "/login", element: <Auth /> },
    { path: "/register", element: <Auth /> },
    { path: "/", element: <Home /> },
    { path: "*", element: <NotFound /> },
  ]);

export default App;
