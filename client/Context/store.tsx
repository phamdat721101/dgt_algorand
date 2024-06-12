'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState, Children } from "react";

interface ContextProps {
    userEmail: string,
    setUserEmail: Dispatch<SetStateAction<string>>
}

const GlobalContext = createContext<ContextProps>({
    userEmail: '',
    setUserEmail: (): string => ''
})

export const GlobalContextProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState('');
    return (
        <GlobalContext.Provider value={{ userEmail, setUserEmail }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext);