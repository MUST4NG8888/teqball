import { createContext, useState } from "react"
import axios from "axios"

export const UserContext = createContext()

export const UserProvider = ({children}) => {
  
  const [ user, setUser ] = useState(null)
  const [ teams, setTeams ] = useState([])
  
  const login = (user, token) => {
    setUser(user)
    localStorage.setItem("token", token)
  }
  
  const logout = () => {
    setUser(null)
    localStorage.removeItem("token")
  }
  
  const getTeams = async () => {
    const token = localStorage.getItem("token")
    const response = await axios.get("http://localhost:3000/api/team", {
      headers: {Authorization: `Bearer ${token}`},
    })
    setTeams(response.data)
  }
 
  return (
    <UserContext.Provider value={{user, login, logout, teams, getTeams }}>
      {children}
    </UserContext.Provider>
    )
}
