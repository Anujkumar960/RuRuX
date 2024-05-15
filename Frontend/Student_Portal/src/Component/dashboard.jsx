import React from 'react';
import { Box, Container, Heading, Stack, Text, Icon } from '@chakra-ui/react';
import { FaBook, FaClipboardCheck, FaUserFriends, FaHandsHelping } from 'react-icons/fa';
import { Navbar } from './Navbar';
import { Footer } from './footer';

const StudentPortalDashboard = () => {
  return (
    <>
      <Navbar />
      <Box
        bgGradient="linear(to-r, #805ad5, #3a36dd)"
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
            <FeatureBox
              icon={<Icon as={FaBook} boxSize={10} color="teal.900" />}
              title="Courses and Schedule"
              description="View your enrolled courses, class schedule, and access course materials to stay organized for your studies."
            />
            <FeatureBox
              icon={<Icon as={FaClipboardCheck} boxSize={10} color="teal.900" />}
              title="Assignments and Grades"
              description="Keep track of assignments, submit coursework, and check your grades to monitor your academic progress."
            />
            <FeatureBox
              icon={<Icon as={FaHandsHelping} boxSize={10} color="teal.900" />}
              title="Student Support"
              description="Get assistance with academic advising, counseling services, and technical support for any issues you encounter."
            />
            <FeatureBox
              icon={<Icon as={FaUserFriends} boxSize={10} color="teal.900" />}
              title="Community and Events"
              description="Engage with fellow students, participate in campus events, and join student organizations to enrich your university experience."
            />
          </Stack>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

const FeatureBox = ({ icon, title, description }) => {
  return (
    <Box
      borderRadius="lg"
      p={6}
      bg="#805ad5"
      boxShadow="md"
      transition="transform 0.3s ease-in-out"
      _hover={{ transform: "scale(1.05)" }}
    >
      {icon}
      <Heading as="h2" size="xl" mb={4} color="teal.900">
        {title}
      </Heading>
      <Text fontSize="lg" color="teal.900">
        {description}
      </Text>
    </Box>
  );
};

export default StudentPortalDashboard;
