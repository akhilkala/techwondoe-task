import { useAuth } from "../context/AuthContext";

export default function Protected(component: () => JSX.Element) {
  const auth = useAuth();

  return component;
}
