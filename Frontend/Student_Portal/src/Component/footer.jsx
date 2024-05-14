import React from 'react';
import { Box, Flex, Text, Link, Divider, Icon } from '@chakra-ui/react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box bg="teal.800" color="white" py={8}>
      <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center" px={8}>
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={4}>Quick Links</Text>
          <Flex direction="column">
            <Link mb={2} _hover={{ color: 'teal.500' }}>Home</Link>
            <Link mb={2} _hover={{ color: 'teal.500' }}>Courses</Link>
            <Link mb={2} _hover={{ color: 'teal.500' }}>Assignments</Link>
            <Link mb={2} _hover={{ color: 'teal.500' }}>Grades</Link>
            <Link mb={2} _hover={{ color: 'teal.500' }}>Support</Link>
            <Link mb={2} _hover={{ color: 'teal.500' }}>Events</Link>
          </Flex>
        </Box>
        <Divider orientation="vertical" borderColor="teal.600" />
        <Box mt={{ base: 4, md: 0 }} ml={{ base: 0, md: 8 }}>
          <Text fontSize="lg" fontWeight="bold" mb={4}>Contact Us</Text>
          <Flex direction="column">
            <Flex align="center" mb={2}>
              <Icon as={FaEnvelope} mr={2} />
              <Text>Email: info@example.com</Text>
            </Flex>
            <Flex align="center" mb={2}>
              <Icon as={FaPhone} mr={2} />
              <Text>Phone: +123-456-7890</Text>
            </Flex>
            <Flex align="center" mb={2}>
              <Icon as={FaMapMarkerAlt} mr={2} />
              <Text>Address: 123 University St, City, Country</Text>
            </Flex>
          </Flex>
        </Box>
        <Divider orientation="vertical" borderColor="teal.600" />
        <Box mt={{ base: 4, md: 0 }} ml={{ base: 0, md: 8 }}>
          <Text fontSize="lg" fontWeight="bold" mb={4}>Follow Us</Text>
          <Flex direction="column">
            <Link mb={2} _hover={{ color: 'teal.500' }}>Facebook</Link>
            <Link mb={2} _hover={{ color: 'teal.500' }}>Twitter</Link>
            <Link mb={2} _hover={{ color: 'teal.500' }}>Instagram</Link>
          </Flex>
        </Box>
      </Flex>
      <Divider mt={8} borderColor="teal.600" />
      <Text textAlign="center" mt={4} fontSize="sm">&copy; 2024 Student Portal. All rights reserved.</Text>
    </Box>
  );
};

export default Footer;
