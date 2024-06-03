import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const Userprovider = ({children}) => {
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
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
};

export default Userprovider;