import React, { useState, useEffect } from 'react';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';

const MyProfilePage = () => {
  const [studentId, setStudentId] = useState(null);
  const [token, setToken] = useState(null); 

  useEffect(() => {
    fetchStudentId();
  }, [token]); 
  const authenticateUser = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token); 
    } else {
      
    }
  };

  const fetchStudentId = async () => {
    try {
      const response = await fetch('https://api.example.com/student/id', {
        headers: {
          Authorization: `Bearer ${token}` // Include token in Authorization header
        }
      });
      if (response.ok) {
        const data = await response.json();
        setStudentId(data.id); // Update studentId state with fetched ID
      } else {
        throw new Error('Failed to fetch student ID');
      }
    } catch (error) {
      console.error('Error fetching student ID:', error.message);
    }
  };

  // Static data for demonstration
  const name = "John Doe";
  const email = "john.doe@example.com";
  const otherDetails = [
    { label: "Age", value: "25" },
    { label: "Gender", value: "Male" },
    { label: "Location", value: "New York, USA" }
  ];

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      py={8}
    >
      <Container
        maxW="lg"
        borderRadius="lg"
        p={8}
        boxShadow="xl"
        textAlign="center"
        bg="white"
      >
        <Heading as="h1" mb={4} fontSize="4xl" fontWeight="bold" color="teal.800">
          My Profile
        </Heading>
        <Text fontSize="xl" color="teal.800">
          Welcome, {name}!
        </Text>
        <VStack spacing={4} align="start" mt={8}>
          <ProfileDetail label="Name" value={name} />
          <ProfileDetail label="Email" value={email} />
          {studentId && <ProfileDetail label="Student ID" value={studentId} />}
          {otherDetails.map((detail, index) => (
            <ProfileDetail key={index} label={detail.label} value={detail.value} />
          ))}
        </VStack>
      </Container>
    </Box>
  );
};

const ProfileDetail = ({ label, value }) => (
  <Box>
    <Text fontSize="lg" fontWeight="bold" color="teal.900">
      {label}:
    </Text>
    <Text fontSize="lg" color="teal.900">
      {value}
    </Text>
  </Box>
);

export default MyProfilePage;
