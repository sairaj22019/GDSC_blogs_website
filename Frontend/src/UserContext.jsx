import { createContext, useState } from "react";


export const Usercontext = createContext({})

export function UserContextProvider({children}){
    const [userInfo , setuserInfo] = useState({})
    return (
        <Usercontext.Provider value={{userInfo,setuserInfo}} >
            {children}
        </Usercontext.Provider>
    )
}

