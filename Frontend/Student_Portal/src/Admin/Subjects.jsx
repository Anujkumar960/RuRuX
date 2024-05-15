import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Navbar } from "../Component/Navbar";
import { Footer } from "../Component/footer";

const SubjectModal = ({ isOpen, onClose, subject, handleChange, onSave }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        {subject?.streamId ? "Edit Subject" : "Add New Subject"}
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            placeholder="Name"
            value={subject.name || ""}
            onChange={handleChange}
            mb={3}
          />
          <FormLabel>Stream ID</FormLabel>
          <Input
            name="streamId"
            placeholder="streamId"
            value={subject.streamId || ""}
            onChange={handleChange}
            mb={3}
          />
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

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState({
    name: "",
  });
  const [currentSubject1, setCurrentSubject1] = useState({
    name: "",
  });
  const toast = useToast();

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const { data } = await axios.get("https://rurux.onrender.com/admin/subjects", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setSubjects(data.subjects);
    } catch (error) {
      toast({
        title: "Error fetching Subjects",
        description: "Failed to fetch Subjects",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleDeleteSubject = async (subjectId) => {
    try {
      await axios.delete(`https://rurux.onrender.com/admin/subjects/${subjectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setSubjects(
        subjects.filter((subject) => subject.subjectId !== subjectId)
      );
      toast({
        title: "Subject Deleted",
        description: "The subject has been successfully deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error Deleting Subject",
        description: "Failed to delete subject",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentSubject({ ...currentSubject, [name]: value });
  };

  const handleSaveSubject = async () => {
    const method = currentSubject1.streamId ? "patch" : "post";
    const url = currentSubject1.streamId
      ? `https://rurux.onrender.com/admin/subjects/${currentSubject.streamId}`
      : `https://rurux.onrender.com/admin/subjects`;
    try {
      await axios[method](url, currentSubject, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      fetchSubjects();
      toast({
        title: "Subject added successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      closeModal();
    } catch (error) {
      toast({
        title: "Error saving subject",
        description: "Failed to save subject details",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const openModal = (subject = { name: "" }) => {
    setCurrentSubject(subject);
    setCurrentSubject1(subject);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <Navbar/>
      <Box width="100%" p={4}>
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Button colorScheme="green" onClick={() => openModal()}>
            ADD NEW SUBJECT
          </Button>
        </Flex>
        <TableContainer>
          <Table variant="striped" size="sm">
            <Thead>
              <Tr>
                <Th>Stream ID</Th>
                <Th>Name</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {subjects.map((subject, i) => (
                <Tr key={i}>
                  <Td>{subject.streamId}</Td>
                  <Td>{subject.name}</Td>
                  <Td>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={() => openModal(subject)}
                    >
                      Edit
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDeleteSubject(subject.subjectId)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th colSpan="3"></Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
        <SubjectModal
          isOpen={isModalOpen}
          onClose={closeModal}
          subject={currentSubject}
          handleChange={handleChange}
          onSave={handleSaveSubject}
        />
      </Box>
      <Footer/>
    </>
  );
};

export default SubjectList;
