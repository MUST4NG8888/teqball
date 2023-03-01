import { Card,Heading,Text,Button,Flex,Stack,Image,useToast, CardBody, CardFooter } from '@chakra-ui/react'


const EventCard = ({event}) =>{

    const token = localStorage.getItem("token")
    const toast = useToast();
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
      src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{event.summary}</Heading>
      <Text>{event.location}</Text>
      <Text>{event.description}</Text>
      <Flex>
      <Text >
        {event.start.dateTime}
      </Text>
      <Text>
        {event.end.dateTime}
      </Text>
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