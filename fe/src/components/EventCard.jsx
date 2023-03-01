import { Card,Heading,Text,Button,Flex,Stack,Image,useToast, CardBody, CardFooter } from '@chakra-ui/react'
import { TimeIcon } from "@chakra-ui/icons"
import formatDate from "../utils/formatDate"

const EventCard = ({event}) =>{

  const token = localStorage.getItem("token")
  const toast = useToast()

    const saveToCalendar = async() =>{
        const id= event._id
        const response = await fetch("http://localhost:3000/api/event/addtocalendar",
        {
            method:"POST",
            headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
                    },
            body: JSON.stringify({id})
        },
       )
        console.log(response)
        if (!response.ok) {
            return toast({
                title: 'Event not added',
                description: "We've could not add the event.",
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
              })
        }
        toast({
            title: 'Event added.',
            description: "We've added your event to your calendar.",
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
            })
    }

    return(

<Card w="calc(50% - 8px)" mb="16px">
  <CardBody>
    <Image
      src='https://assets.fiteq.org/teqball/how-to-hero.jpg'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{event.summary}</Heading>
      <Text>Location: {event.location}</Text>
      <Text>Description: {event.description}</Text>
      <Flex gap="4">
        <Text fontSize="sm"><TimeIcon /> {formatDate(event.start.dateTime)}</Text>
        <Text fontSize="sm"><TimeIcon /> {formatDate(event.end.dateTime)}</Text>
      </Flex>
    </Stack>
  </CardBody>
  <CardFooter>
      <Button onClick={saveToCalendar}>
        Add to Calendar
      </Button>
  </CardFooter>
</Card>
    )
}


export default EventCard