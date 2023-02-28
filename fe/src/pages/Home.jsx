import { Flex, Text, Heading, Highlight, Box } from "@chakra-ui/react"

const Home = () => {
  return (
    <Flex justifyContent="center" alignItems="center" gap="8">
      <Box w="50%" h="sm" bg="gray.100" />
      <Flex w="50%" flexDirection="column" gap="8" justifyContent="center" alignItems="center">
        <Heading textAlign="center">
          <Highlight query={["Teqball"]} styles={{ px: "4", py: "0.5", rounded: "full", bg: "teal.100" }}>
            Take your Teqball game to the next level with our event creation tool
          </Highlight>
          </Heading>
        <Text textAlign="center">Welcome to Teqball Reserve, the premier destination for creating Teqball events online. Our platform makes it easy for you to create and enjoy Teqball games with your friends, family, or colleagues.</Text> 
      </Flex>
    </Flex>
  )
}

export default Home