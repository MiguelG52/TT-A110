"use client"
import { createContext, useContext, useState } from "react";
import { IUser } from "@/models/models";

type UserContextType = {
  user: IUser | null;
  updateUser: (newUserData: Partial<IUser>) => void;
  isAuth: boolean;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  updateUser: () => {},
  isAuth: false,
});

export const useUser = (): UserContextType => useContext(UserContext);

export function UserProvider({
  initialUser,
  children,
}: {
  initialUser: IUser | null;
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<IUser | null>(initialUser);
  const [isAuth, setIsAuth] = useState(!!initialUser);

  const updateUser = (newUserData: Partial<IUser> | null) => {
    if (newUserData === null) {
      setUser(null);
      setIsAuth(false);
    } else {
      setUser(prev => ({
        ...prev,
        ...newUserData,
      } as IUser));
      setIsAuth(true);
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser, isAuth }}>
      {children}
    </UserContext.Provider>
  );
}