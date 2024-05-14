import React, { useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  Img,
  Select,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";


const loggingCredentials = {
  email: "",
  password: "",
};

const emptyStudentObject = {
  username: "",
  email: "",
  password: "",
  streamId: "",
  subjectId: [],
};

export const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const navigate = useNavigate();
 const { handleLogin, handleSignUp } = useAuth();
  const [isRegisterForm, setIsRegisterForm] = useState(false);

  const [loggingData, setLoggingData] = useState(loggingCredentials);
  const [registerData, setRegisterData] = useState(emptyStudentObject);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastShow = await handleLogin(loggingData);
    if (toastShow.success) {
      toast({
        title: "Login Successful",
        description: `Hi ${loggingData.email} Welcome Back`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Redirect logic can be implemented here
    } else {
      toast({
        title: "Login Failed",
        description: "Wrong Credential",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setLoggingData(loggingCredentials)
    console.log(loggingData);
  };

  const handleChange = (e) => {
    setLoggingData({ ...loggingData, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    console.log(registerData);
     await handleSignUp(registerData);
  };

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    if (name === "subjectId") {
      const subjects = value
        .split(" ")
        .map((subject) => parseInt(subject.trim(), 10))
        .filter((subject) => !isNaN(subject));
      setRegisterData({ ...registerData, [name]: subjects });
    } else {
      setRegisterData({ ...registerData, [name]: value });
    }
    setRegisterData(emptyStudentObject);
  };

  const handleRegister = () => {
    setIsRegisterForm(true);
    setIsLoginForm(false);
  };

  const handleBackToLogin = () => {
    setIsLoginForm(true);
    setIsRegisterForm(false);
  };

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        w={{ base: "50%", md: "80%", lg: "60%" }}
        h={{ base: "auto", md: "70%", lg: "70%" }}
        border="1px solid #ccc"
        borderRadius="md"
        boxShadow="md"
      >
        <Box
          flex="1"
          h={{ base: "50%", md: "100%" }}
          borderRight={{ base: "none", md: "1px solid #ccc" }}
          borderBottom={{ base: "1px solid #ccc", md: "none" }}
        >
          <Img
            src="https://cdn.dribbble.com/users/2176762/screenshots/5412967/student-portal-daydream-360-degree-stereoscopic-image_4x.png"
            alt="Image"
            height="100%"
            objectFit="cover"
          />
        </Box>
        <Flex
          flex="1"
          p={5}
          pt={2}
          h={{ base: "50%", md: "100%" }}
          alignItems="center"
          justifyContent="center"
          borderLeft={{ base: "none", md: "1px solid #ccc" }}
          borderTop={{ base: "1px solid #ccc", md: "none" }}
          marginTop={{ base: "16px", md: "0" }}
        >
          {isLoginForm && !isRegisterForm && (
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <FormControl id="email" mb={4}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="text"
                  name="email"
                  required
                  placeholder="Enter your Email"
                  w="100%"
                  value={loggingData.email}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="password" mb={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={loggingData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                />
              </FormControl>

              <Button type="submit" colorScheme="blue" mb={4} w="100%">
                Sign in
              </Button>

              <Flex justify="space-between">
                <Link>Forgot Password?</Link>
                <Link onClick={handleRegister}>Register</Link>
              </Flex>
            </form>
          )}

          {isRegisterForm && (
            <form onSubmit={handleRegistration} style={{ width: "100%" }}>
              {/* <Flex
                direction={{ base: "column", md: "row" }}
                alignItems="center"
              > */}
              <FormControl id="username" mb={4} mr={{ md: 4 }}>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={registerData.username}
                  required
                  placeholder="Enter your Username"
                  onChange={handleRegistrationChange}
                />
              </FormControl>

              <FormControl id="email" mb={4}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={registerData.email}
                  required
                  placeholder="Enter your Email"
                  onChange={handleRegistrationChange}
                />
              </FormControl>
              {/* </Flex> */}

              <Flex
                direction={{ base: "column", md: "row" }}
                alignItems="center"
              >
                <FormControl id="password" mb={4} mr={{ md: 4 }}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={registerData.password}
                    required
                    placeholder="Enter your password"
                    onChange={handleRegistrationChange}
                  />
                </FormControl>

                <FormControl id="stream" mb={4}>
                  <FormLabel>Select Stream</FormLabel>
                  <Select
                    name="streamId"
                    value={registerData.streamId}
                    onChange={handleRegistrationChange}
                    required
                    placeholder="Select your stream"
                  >
                    <option value="1">Science</option>
                    <option value="2">Commerce</option>
                    <option value="3">Arts</option>
                  </Select>
                </FormControl>
              </Flex>
              <FormControl id="subjectId" mb={4}>
                <FormLabel>Enter Subject Code</FormLabel>
                <Input
                  type="text"
                  name="subjectId"
                  value={registerData.subjectId.join(",")}
                  onChange={handleRegistrationChange}
                  required
                  placeholder="Enter comma-separated Subject Ids"
                />
              </FormControl>

              <Button type="submit" colorScheme="blue" mb={4} w="100%">
                Register
              </Button>
              <Link onClick={handleBackToLogin}>Back to Login</Link>
            </form>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};
