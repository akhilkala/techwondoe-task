import {
  ReactElement,
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";
import api from "../utils/api.service";
import { IUser, Nullable } from "../utils/types";
import jwt from "jwt-decode";

type Value = {
  user: Nullable<IUser>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    name: string,
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  loading: Boolean;
};

interface Props {
  children: ReactElement;
}

const AuthContext = createContext<Nullable<Value>>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }: Props): ReactElement {
  const [user, setUser] = useState<Nullable<IUser>>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user: IUser = jwt(token);
      setUser(user);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // setLoading(true);
    try {
      const res = await api.post("/auth/login", {
        email: email.toLowerCase().trim(),
        password,
      });

      const user: IUser = jwt(res.token);
      setUser(user);
      localStorage.setItem("token", res.token);
    } catch (err) {
      throw err;
    }
  };

  const register = async (
    name: string,
    username: string,
    email: string,
    password: string
  ) => {
    try {
      await api.post("/auth/register", {
        name,
        username,
        email: email.trim().toLowerCase(),
        password,
      });
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      localStorage.removeItem("token");
    } catch (err) {
      throw err;
    }
  };

  const value = {
    user,
    login,
    logout,
    register,
    loading,
  };

  if (loading) return <h1>Loading</h1>;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
