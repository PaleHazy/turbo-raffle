import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { getAllUsers } from "../routes/Users";

const UsersContext = createContext<any[]>([]);

export function UsersProvider({ children }: PropsWithChildren<any>) {
 const [users, setUsers] = useState<any>([]);
 const val = useMemo(() => ([ users, setUsers] ), [users, setUsers]);
 
 useEffect(() => {
  let interval = setInterval(() => {
    getAllUsers().then((res) => {
      setUsers(res.AllUsers);
    });
  }, 25000);

  return () => clearInterval(interval);
}, []);
 
 return (
    <UsersContext.Provider value={val}>
      {children}
    </UsersContext.Provider>
  );
} 

export function useUsers() {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
}