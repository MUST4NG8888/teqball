import { Card, CardBody, CardFooter, Image, Stack, Text, Heading, Button, Badge } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

const TeamCard = ({ team }) => {
  const navigate = useNavigate()
  const [ isAccepted, setIsAccepted ] = useState(team.member.accepted)
  const token = localStorage.getItem("token")
  const teamId = team.member.teamId

  const joinTeam = async () => {
    const response = await axios.post("http://localhost:3000/api/user/join", {teamId}, {
      headers: {Authorization: `Bearer ${token}`},
    })
    console.log(response.data)
  }

  return (
    <Card w="calc(50% - 8px)" mb="16px">
      <CardBody>
        <Image src="https://images.unsplash.com/photo-1529900748604-07564a03e7a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGZvb3RiYWxsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60" borderRadius="lg" />
        <Stack mt="2">
          <Heading size="md">{ team.name }</Heading>
          { team.member.admin 
            ? <Badge colorScheme="red" w="fit-content" px="2">Admin</Badge>
            : <Badge colorScheme="green" w="fit-content" px="2">Player</Badge>
          }
          <Text>{ team.events } events</Text>
        </Stack>
      </CardBody>
      <CardFooter>
        { isAccepted
          ? <Button size="sm" onClick={() => navigate(`/dashboard/${team.member.teamId}`)}>Enter team</Button>
          : <Button size="sm" onClick={joinTeam}>Join team</Button>
        }
      </CardFooter>
    </Card>
  )
}

export default TeamCard