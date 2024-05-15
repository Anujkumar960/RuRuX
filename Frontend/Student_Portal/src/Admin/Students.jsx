import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Select,
  Flex,
  IconButton,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import {
  FaRegArrowAltCircleRight,
  FaRegArrowAltCircleLeft,
} from "react-icons/fa";
import { Navbar } from "../Component/Navbar";
import { Footer } from "../Component/footer";

const StudentModal = ({ isOpen, onClose, student, handleChange, onSave }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        {student?.userID ? "Edit Student" : "Add New Student"}
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            name="username"
            placeholder="Name"
            value={student.username || ""}
            onChange={handleChange}
            mb={3}
          />
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            placeholder="Email"
            value={student.email || ""}
            onChange={handleChange}
            mb={3}
          />
          {!student?.userID ? (
            <>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                placeholder="Password"
                value={student.password || ""}
                onChange={handleChange}
                mb={3}
              />
            </>
          ) : (
            ""
          )}

          {student?.role != "admin" ? (
            <>
              <FormLabel>subjectId</FormLabel>
              <Input
                name="subjectId"
                placeholder="subjectId"
                value={student.subjectId || ""}
                onChange={handleChange}
                mb={3}
              />
              <FormLabel>StreamId</FormLabel>
              <Input
                name="streamId"
                placeholder="streamId"
                value={student.streamId || ""}
                onChange={handleChange}
                mb={3}
              />
            </>
          ) : (
            ""
          )}
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" onClick={onSave}>
          Save
        </Button>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({
    username: "",
    email: "",
    userID: "",
  });
  const [currentStudent1, setCurrentStudent1] = useState({
    username: "",
    email: "",
    userID: "",
  });
  const toast = useToast();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4500/admin/students`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setStudents(data.users);
      console.log(data);
    } catch (error) {
      toast({
        title: "Error fetching Students",
        description: "Failed to fetch Students",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleDeleteStudent = async (userID) => {
    try {
      await axios.delete(`http://localhost:4500/admin/students/${userID}`, {
        // Add your authorization header here
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setStudents(students.filter((student) => student.userID !== userID));
      toast({
        title: "Student Deleted",
        description: "The student has been successfully deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error Deleting Student",
        description: "Failed to delete student",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentStudent({ ...currentStudent, [name]: value });
  };

  const handleSaveStudent = async () => {
    const method = currentStudent1.userID != "" ? "patch" : "post";
    const url =
      currentStudent1.userID != ""
        ? `http://localhost:4500/admin/students/${currentStudent.userID}`
        : `http://localhost:4500/admin/students`;
    console.log(url, method);
    try {
      await axios[method](url, currentStudent, {
        // Add your authorization header here
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      fetchStudents(); // Refetch students to reflect changes
      toast({
        title: "Student added successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      closeModal();
    } catch (error) {
      toast({
        title: "Error saving student",
        description: "Failed to save student details",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const openModal = (student = { name: "", email: "", userID: "" }) => {
    setCurrentStudent(student);
    setCurrentStudent1(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar/>
      <Box width="100%" p={4}>
        <Flex gap={5}>
          <Button colorScheme="green" onClick={() => openModal()}>
            ADD NEW STUDENT
          </Button>
        </Flex>
        <TableContainer>
          <Table variant="striped" size="sm">
            <Thead>
              <Tr>
                <Th>StudentID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>STREAM ID</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {students?.map((student) => (
                <Tr key={student.userID}>
                  <Td>{student.userID}</Td>
                  <Td>{student.username}</Td>
                  <Td>{student.email}</Td>
                  <Td>{student.streamId}</Td>
                  <Td>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={() => openModal(student)}
                    >
                      Edit
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDeleteStudent(student.userID)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th colSpan="4"></Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
        <StudentModal
          isOpen={isModalOpen}
          onClose={closeModal}
          student={currentStudent}
          handleChange={handleChange}
          onSave={handleSaveStudent}
        />
      </Box>
      <Footer/>
    </>
  );
};

export default StudentList;
