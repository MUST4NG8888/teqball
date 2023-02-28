import { useContext, useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { UserContext } from "../context/UserContext"
import { Text } from "@chakra-ui/react"

const LoginFinished = () => {
  const { login } = useContext(UserContext)
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const code = searchParams.get("code")

  useEffect(() => {
    const sendCode = async () => {
      const response = await axios.post("http://localhost:3000/api/login", {code})
      const token = await response.data
      const decoded = jwt_decode(token)
      const user = {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      }
      login(user, token)
      navigate("/dashboard")
    }
    sendCode()
  }, [])

  return <Text>Login...</Text>
}

export default LoginFinished
