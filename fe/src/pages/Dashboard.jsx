import CreateTeam from "../components/CreateTeam"
import TeamCard from "../components/TeamCard"
import { Heading, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import axios from "axios"

const Dashboard = () => {
  const [ teams, setTeams ] = useState([])
  const token = localStorage.getItem("token")

  useEffect(() => {
    const getTeams = async () => {
      const response = await axios.get("http://localhost:3000/api/team", {
        headers: {Authorization: `Bearer ${token}`},
      })
      setTeams(response.data)
    }
    getTeams()
  }, [])

  return (
    <Flex flexDirection="column" gap="8">
      <Heading size="md">Dashboard</Heading>      
      <Flex justifyContent="space-between">
        <Heading size="md" >Your teams</Heading>
        <CreateTeam />
      </Flex>
      <Flex justifyContent="space-between" flexWrap="wrap">
      { teams && teams.map(team => (
        <TeamCard key={team.member.teamId} team={team} />
      ))}
      </Flex>
    </Flex>
  )
}

export default Dashboard