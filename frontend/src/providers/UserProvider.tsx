// UserContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface UserContextType {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    const storedIsAdmin = localStorage.getItem("isAdmin");
    return storedIsAdmin ? JSON.parse(storedIsAdmin) : false;
  });

  useEffect(() => {
    localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
  }, [isAdmin]);

  return (
    <UserContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
