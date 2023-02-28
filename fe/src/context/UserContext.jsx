import { createContext, useState } from "react"

export const UserContext = createContext()

export const UserProvider = ({children}) => {
  const [ user, setUser ] = useState(null)

  const login = (user, token) => {
    setUser(user)
    localStorage.setItem("token", token)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("token")
  }
 
  return (
    <UserContext.Provider value={{user, login, logout}}>
      {children}
    </UserContext.Provider>
    )
}
