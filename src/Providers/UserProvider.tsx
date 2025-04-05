import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { userContextType, userType } from '../types/types';

const defaultUser: userType = {
    email: "",
    first_name: "",
    id: "",
    last_name: "",
    phone_number: "",
    role: "",
    specialization: ""
}
const defaultContext: userContextType = {
    user: defaultUser,
    setUser: ()=>{},
    isLoggedIn: false,
    setIsLoggedIn: ()=>{}
}

const UserContext = createContext(defaultContext);

export default function UserProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<userType>(()=>{
        const savedUser = localStorage.getItem('user')
        if(!savedUser) return defaultUser
        return JSON.parse(savedUser)
    })
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          localStorage.removeItem('user');
        }
      }, [user]);
    
    const value = useMemo(()=>({
        user,
        isLoggedIn,
        setUser,
        setIsLoggedIn
    }), [user, isLoggedIn])

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
}

export function useUserCtx() {
    const context = useContext(UserContext);
    if (!context) throw new Error('useAuth musi być używany wewnątrz UserProvider');
    return context;
}