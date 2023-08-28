import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({user:{}});

export function UserContextProvider({children}){
    const [user,setUser] = useState(null); 
    
    useEffect(() => {
        if(!user){
            const obj = JSON.parse(localStorage.getItem('user'));
            setUser(obj);
        }
    }, []);
    return (
        <UserContext.Provider value={{user,setUser}}>
            {children} 
        </UserContext.Provider>
    );
}