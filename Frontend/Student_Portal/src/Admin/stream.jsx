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

const StreamModal = ({ isOpen, onClose, stream, handleChange, onSave }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        {stream?.streamId ? "Edit Stream" : "Add New Stream"}
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            placeholder="Name"
            value={stream.name || ""}
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

const StreamList = () => {
  const [streams, setStreams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStream, setCurrentStream] = useState({
    name: "",
  });
  const [currentStream1, setCurrentStream1] = useState({
    name: "",
  });
  const toast = useToast();

  useEffect(() => {
    fetchStreams();
  }, []);

  const fetchStreams = async () => {
    try {
      const { data } = await axios.get("http://localhost:4500/admin/streams", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setStreams(data.streams);
    } catch (error) {
      toast({
        title: "Error fetching Streams",
        description: "Failed to fetch Streams",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleDeleteStream = async (streamId) => {
    try {
      await axios.delete(`http://localhost:4500/admin/streams/${streamId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setStreams(streams.filter((stream) => stream.streamId !== streamId));
      toast({
        title: "Stream Deleted",
        description: "The stream has been successfully deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error Deleting Stream",
        description: "Failed to delete stream",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentStream({ ...currentStream, [name]: value });
  };

  const handleSaveStream = async () => {
    const method = currentStream1.streamId ? "patch" : "post";
    const url = currentStream1.streamId
      ? `http://localhost:4500/admin/streams/${currentStream.streamId}`
      : `http://localhost:4500/admin/streams`;
    try {
      await axios[method](url, currentStream, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      fetchStreams();
      toast({
        title: "Stream added successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      closeModal();
    } catch (error) {
      toast({
        title: "Error saving stream",
        description: "Failed to save stream details",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const openModal = (stream = { name: "", streamId: "" }) => {
    setCurrentStream(stream);
    setCurrentStream1(stream);
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
            ADD NEW STREAM
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
              {streams.map((stream) => (
                <Tr key={stream.streamId}>
                  <Td>{stream.streamId}</Td>
                  <Td>{stream.name}</Td>
                  <Td>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={() => openModal(stream)}
                    >
                      Edit
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDeleteStream(stream.streamId)}
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
        <StreamModal
          isOpen={isModalOpen}
          onClose={closeModal}
          stream={currentStream}
          handleChange={handleChange}
          onSave={handleSaveStream}
        />
      </Box>
      <Footer/>
    </>
  );
};

export default StreamList;
