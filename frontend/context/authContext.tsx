"use client"
import { createContext, useContext } from "react";
import { IUser } from "@/models/models";

export const UserContext = createContext<{ user: IUser | null }>({ user: null });

export const useUser = () => useContext(UserContext);

export function UserProvider({user, children}: { user: IUser; children: React.ReactNode;}) {
    return (
      <UserContext.Provider value={{ user }}>
        {children}
      </UserContext.Provider>
    );
  }
