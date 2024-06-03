import { createContext, useState, useEffect } from "react";

export const Usercontext = createContext();

export const Userprovider = ({children}) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if(user) {
            localStorage.setItem('user', JSON.stringify(user));
        }else {
            localStorage.removeItem('user');
        }
    }, [user])

    return (
        <Usercontext.Provider value={{user, setUser}}>
            {children}
        </Usercontext.Provider>
    )
}