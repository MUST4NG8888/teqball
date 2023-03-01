import { Heading, Flex } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import CreateEvent from "../components/CreateEvent";
import EventCard from "../components/EventCard"
import InviteUser from "../components/InviteUser";

const TeamPage = () => {
  const [ isAdmin, setIsAdmin ] = useState(false)
  const [ events, setEvents ] = useState([])

  const { id } = useParams();
  const { teams } = useContext(UserContext)
  const teamName = teams.find(team => team.member.teamId == id).name

  const getEvents = async () => {
    const token = localStorage.getItem("token")
    const response = await axios.get(`http://localhost:3000/api/event/${id}`,{
      headers: {Authorization: `Bearer ${token}`},
    })
    setEvents(response.data)
  }

  useEffect(() => {
    const checkAdmin = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/team/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      setIsAdmin(response.data.isAdmin)
    }  
    checkAdmin()
    getEvents()
  }, [])

  return (
      <Flex flexDirection="column" gap="8">
      <Heading size="md">Events</Heading>      
      <Flex justifyContent="space-between">
        <Heading size="md" mr="auto">{ teamName }</Heading>
        <InviteUser isAdmin={isAdmin} />
        <CreateEvent {...{getEvents, isAdmin}} />
      </Flex>
      <Flex justifyContent="space-between" flexWrap="wrap">
        {events && events.map(event => <EventCard key={event._id}  {...{event}}/>)}
      </Flex>
    </Flex>
  );
};

export default TeamPage;
