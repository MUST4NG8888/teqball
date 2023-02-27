import LoginButton from "../components/loginButton";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Button } from "@chakra-ui/react";

const Home = () => {
  const {user, logout} = useContext(UserContext);
  console.log("itt vagyok", user);
  return (
    <div>
      <h1>Home</h1>
      <p>Hello {user && user.name}</p> <Button onClick={logout}>Logout</Button>
      <LoginButton />
    </div>
  )
}

export default Home;
