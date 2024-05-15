/* eslint-disable react/prop-types */
import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import logo from "../assets/website.png.jpg"; 

const Logo = () => {
  return (
    <>
      <Image src={logo} alt="Student Portal Logo" h="70px" />
    </>
  );
};

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight="500" fontSize="lg" mb={2}>
      {children}
    </Text>
  );
};

export function Footer() {
  return (
    <Box bg="#1E0A3C" color="white">
      <Container as={Stack} maxW="6xl" py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align="flex-start">
            <ListHeader>Explore</ListHeader>
            <Link href="#">Home</Link>
            <Link href="#">Courses</Link>
            <Link href="#">Assignments</Link>
            <Link href="#">Grades</Link>
            <Link href="#">Events</Link>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Information</ListHeader>
            <Link href="#">About Us</Link>
            <Link href="#">Contact Us</Link>
            <Link href="#">FAQs</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Use</Link>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Support</ListHeader>
            <Link href="#">Help Center</Link>
            <Link href="#">Report a Problem</Link>
            <Link href="#">Feedback</Link>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Follow Us</ListHeader>
            <Link href="#">Facebook</Link>
            <Link href="#">Twitter</Link>
            <Link href="#">Instagram</Link>
            <Link href="#">LinkedIn</Link>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box py={10}>
        <Flex
          align="center"
          _before={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            ml: 8,
          }}
        >
          <Logo />
        </Flex>
        <Text pt={6} fontSize="sm" textAlign="center">
          © {new Date().getFullYear()} Student Portal. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
}
