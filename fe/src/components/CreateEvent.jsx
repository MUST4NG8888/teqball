import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const CreateEvent = () => {
  const { id } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [event, setEvent] = useState({
    start: {
      dateTime: new Date(),
    },
    end: {
      dateTime: new Date(),
    },
    summary: "",
    description: "",
    location: "",
  });
  const toast = useToast();

  const token = localStorage.getItem("token");

  const sendEvent = async () => {
    const newEvent = {
      start: {
        dateTime: event.start.dateTime+":00+01:00",
      },
      end: {
        dateTime: event.end.dateTime+":00+01:00",
      },
      summary: event.summary,
      description:  event.description,
      location: event.location,
    };
    const response = await axios.post(
      "http://localhost:3000/api/event",
      { event: newEvent, id },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.statusText === "OK") {
      toast({
        title: "Event created.",
        description: "We've created your event.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      onClose();
    }
  };

  console.log(event);

  return (
    <>
      <Button onClick={onOpen} size="sm" leftIcon={<AddIcon />} w="fit-content">
        Create Event
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your event</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Event name</FormLabel>
              <Input
                placeholder="Event name"
                value={event.summary}
                onChange={(e) =>
                  setEvent({ ...event, summary: e.target.value })
                }
              />
              <FormLabel>Start date</FormLabel>
              <Input
                placeholder={new Date()}
                type="datetime-local"
                value={event.start.dateTime}
                onChange={(e) =>
                  setEvent({ ...event, start: { dateTime: e.target.value } })
                }
              />
              <FormLabel>End date</FormLabel>
              <Input
                placeholder={new Date()}
                type="datetime-local"
                value={event.end.dateTime}
                onChange={(e) =>
                  setEvent({ ...event, end: { dateTime: e.target.value } })
                }
              />
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Description"
                value={event.description}
                onChange={(e) =>
                  setEvent({ ...event, description: e.target.value })
                }
              />
              <FormLabel>Location</FormLabel>
              <Input
                placeholder="Location"
                value={event.location}
                onChange={(e) =>
                  setEvent({ ...event, location: e.target.value })
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={sendEvent}>
              Save
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateEvent;