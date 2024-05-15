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

const MarksModal = ({ isOpen, onClose, mark, handleChange, onSave }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{mark?.id ? "Edit Mark" : "Add New Mark"}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <FormControl isRequired>
          <FormLabel>Subject Name</FormLabel>
          <Input
            name="subjectName"
            placeholder="Subject Name"
            value={mark.subjectName || ""}
            onChange={handleChange}
            mb={3}
          />
          <FormLabel>Student Name</FormLabel>
          <Input
            name="studentName"
            placeholder="Student Name"
            value={mark.studentName || ""}
            onChange={handleChange}
            mb={3}
          />
          <FormLabel>Stream</FormLabel>
          <Input
            name="stream"
            placeholder="Stream"
            value={mark.stream || ""}
            onChange={handleChange}
            mb={3}
          />
          <FormLabel>Marks</FormLabel>
          <Input
            type="number"
            name="marks"
            placeholder="Marks"
            value={mark.marks || ""}
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

const MarksList = () => {
  const [marks, setMarks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMark, setCurrentMark] = useState({
    subjectName: "",
    studentName: "",
    stream: "",
    marks: "",
  });
  const [currentMark1, setCurrentMark1] = useState({
    subjectName: "",
    studentName: "",
    stream: "",
    marks: "",
  });
  const toast = useToast();

  useEffect(() => {
    fetchMarks();
  }, []);

  const fetchMarks = async () => {
    try {
      const { data } = await axios.get("http://localhost:4500/admin/marks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(data);
      setMarks(data.marks);
    } catch (error) {
      toast({
        title: "Error fetching Marks",
        description: "Failed to fetch Marks",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleDeleteMark = async (markId) => {
    try {
      await axios.delete(`http://localhost:4500/admin/marks/${markId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setMarks(marks.filter((mark) => mark.id !== markId));
      toast({
        title: "Mark Deleted",
        description: "The mark has been successfully deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error Deleting Mark",
        description: "Failed to delete mark",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentMark({ ...currentMark, [name]: value });
  };

  const handleSaveMark = async () => {
    const method = currentMark1.id ? "patch" : "post";
    const url = currentMark1.id
      ? `http://localhost:4500/admin/marks/${currentMark.id}`
      : `http://localhost:4500/admin/marks`;
    try {
      await axios[method](url, currentMark, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      fetchMarks();
      toast({
        title: "Mark added successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      closeModal();
    } catch (error) {
      toast({
        title: "Error saving mark",
        description: "Failed to save mark details",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const openModal = (
    mark = { subjectName: "", studentName: "", stream: "", marks: "" }
  ) => {
    setCurrentMark(mark);
    setCurrentMark1(mark);
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
            ADD NEW MARK
          </Button>
        </Flex>
        <TableContainer>
          <Table variant="striped" size="sm" >
            <Thead >
              <Tr>
                <Th pl="70px">Subject Name</Th>
                <Th pl="70px">Student Name</Th>
                <Th pl="70px">Stream</Th>
                <Th pl="70px">Marks</Th>
                <Th pl="70px">Grade</Th>
                <Th pl="70px">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {marks.map((mark) => (
                <Tr key={mark.id}>
                  <Td pl="70px">{mark.subjectName}</Td>
                  <Td pl="70px">{mark.studentName}</Td>
                  <Td pl="70px">{mark.streamName}</Td>
                  <Td pl="70px">{mark.marks}</Td>
                  <Td pl="70px">{mark.grade}</Td>
                  <Td>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={() => openModal(mark)}
                    >
                      Edit
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDeleteMark(mark.id)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th colSpan="5"></Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
        <MarksModal
          isOpen={isModalOpen}
          onClose={closeModal}
          mark={currentMark}
          handleChange={handleChange}
          onSave={handleSaveMark}
        />
      </Box>
      <Footer/>
    </>
  );
};

export default MarksList;
