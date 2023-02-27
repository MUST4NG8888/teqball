import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const LoginFinished = () => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const code = searchParams.get("code");
  console.log(code);

  useEffect(() => {
    const sendCode = async () => {
      const response = await axios.post("http://localhost:3000/api/login", {code});
      const token = await response.data;
      const decoded = jwt_decode(token);
      console.log(decoded);
      navigate("/");
    }
    sendCode();
  }, []);

  return <div>Hello world</div>;
};

export default LoginFinished;
