import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { AppUser } from "@/lib/appData";
import {
  ensureSeedData,
  getCurrentUser,
  loginWithEmailPassword,
  logout as logoutSession,
  signupWithEmailPassword,
} from "@/lib/appData";

type AuthContextValue = {
  user: AppUser | null;
  isReady: boolean;
  login: (email: string, password: string) => Promise<{ ok: true; user: AppUser } | { ok: false; error: string }>;
  signup: (input: {
    name: string;
    email: string;
    phone?: string;
    password: string;
  }) => Promise<{ ok: true; user: AppUser } | { ok: false; error: string }>;
  logout: () => void;
  refresh: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      await ensureSeedData();
      if (cancelled) return;
      setUser(getCurrentUser());
      setIsReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isReady,
      login: async (email, password) => {
        const result = await loginWithEmailPassword(email, password);
        if (!result.ok) return result;
        setUser(result.user);
        return result;
      },
      signup: async (input) => {
        const result = await signupWithEmailPassword(input);
        if (!result.ok) return result;
        setUser(result.user);
        return result;
      },
      logout: () => {
        logoutSession();
        setUser(null);
      },
      refresh: () => setUser(getCurrentUser()),
    }),
    [user, isReady],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

