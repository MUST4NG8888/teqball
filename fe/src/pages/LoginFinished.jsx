import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const LoginFinished = () => {

  const {login} = useContext(UserContext);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const code = searchParams.get("code");
  console.log(code);

  useEffect(() => {
    const sendCode = async () => {
      const response = await axios.post("http://localhost:3000/api/login", {code});
      const token = await response.data;
      const decoded = jwt_decode(token);
      const user = {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      };
      login(user, token);
      navigate("/dashboard");
    }
    sendCode();
  }, []);

  return <div>Hello world</div>;
};

export default LoginFinished;
