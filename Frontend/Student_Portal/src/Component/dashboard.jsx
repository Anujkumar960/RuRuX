import React from 'react';
import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react';

const StudentPortalDashboard = () => {
  return (
    <Box
      bg="teal.500"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      py={8}
    >
      <Container
        maxW="container.lg"
        bg="white"
        borderRadius="lg"
        p={8}
        boxShadow="lg"
        textAlign="center"
      >
        <Heading as="h1" mb={8} fontSize="4xl" fontWeight="bold" color="teal.800">
          Welcome to the Student Portal
        </Heading>
        <Stack spacing={8}>
          <Box borderRadius="lg" p={6} bg="teal.100" boxShadow="md" transition="transform 0.3s ease-in-out" _hover={{ transform: "scale(1.05)" }}>
            <Heading as="h2" size="xl" mb={4} color="teal.900">Courses and Schedule</Heading>
            <Text fontSize="lg" color="teal.900">
              View your enrolled courses, class schedule, and access course materials to stay organized for your studies.
            </Text>
          </Box>
          <Box borderRadius="lg" p={6} bg="teal.100" boxShadow="md" transition="transform 0.3s ease-in-out" _hover={{ transform: "scale(1.05)" }}>
            <Heading as="h2" size="xl" mb={4} color="teal.900">Assignments and Grades</Heading>
            <Text fontSize="lg" color="teal.900">
              Keep track of assignments, submit coursework, and check your grades to monitor your academic progress.
            </Text>
          </Box>
          <Box borderRadius="lg" p={6} bg="teal.100" boxShadow="md" transition="transform 0.3s ease-in-out" _hover={{ transform: "scale(1.05)" }}>
            <Heading as="h2" size="xl" mb={4} color="teal.900">Student Support</Heading>
            <Text fontSize="lg" color="teal.900">
              Get assistance with academic advising, counseling services, and technical support for any issues you encounter.
            </Text>
          </Box>
          <Box borderRadius="lg" p={6} bg="teal.100" boxShadow="md" transition="transform 0.3s ease-in-out" _hover={{ transform: "scale(1.05)" }}>
            <Heading as="h2" size="xl" mb={4} color="teal.900">Community and Events</Heading>
            <Text fontSize="lg" color="teal.900">
              Engage with fellow students, participate in campus events, and join student organizations to enrich your university experience.
            </Text>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default StudentPortalDashboard;
