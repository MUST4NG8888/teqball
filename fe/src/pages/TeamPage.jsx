import { Heading, Flex } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import CreateEvent from "../components/CreateEvent";

const TeamPage = () => {
  
  const { user } = useContext(UserContext);
  console.log("user", user);

  const [isAdmin, setIsAdmin] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const checkAdmin = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/team/${id}`,
        { 
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("response", response.data);
    }  
    checkAdmin();
  }, []);

  return (
    <div>
      <Flex flexDirection="column" gap="8">
      <Heading size="md">Dashboard</Heading>      
      <Flex justifyContent="space-between">
        <Heading size="md" >Team {id}</Heading>
        <CreateEvent />
      </Flex>
     
    </Flex>
    </div>
  );
};

export default TeamPage;
