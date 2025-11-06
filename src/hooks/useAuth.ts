import { inject } from "vue";
import { User } from "../types/script";

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthSymbol = Symbol("AuthContext");

export function useAuth(): AuthContextType {
  const context = inject<AuthContextType>(AuthSymbol);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthSymbol ;
