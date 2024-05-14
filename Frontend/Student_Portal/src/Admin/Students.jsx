import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Button, FormControl, FormLabel, Input, Table,
  Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer,
  Select, Flex, IconButton, useToast, Modal,
  ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, Text
} from '@chakra-ui/react';
import { FaRegArrowAltCircleRight, FaRegArrowAltCircleLeft } from "react-icons/fa";


const StudentModal = ({ isOpen, onClose, student, onChange, onSave }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{student?.studentID ? 'Edit Student' : 'Add New Student'}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input name="name" placeholder="Name" value={student.name || ''} onChange={onChange} mb={3} />
          <FormLabel>Email</FormLabel>
          <Input name="email" placeholder="Email" value={student.email || ''} onChange={onChange} mb={3} />
          <FormLabel>Grade</FormLabel>
          <Input name="grade" placeholder="Grade" value={student.grade || ''} onChange={onChange} mb={3} />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" onClick={onSave}>Save</Button>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({ name: '', email: ''});
  const toast = useToast();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4500/admin/students`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      });
    //   setStudents(data.users);
    console.log(data);
    } catch (error) {
      toast({
        title: 'Error fetching Students',
        description: 'Failed to fetch Students',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };


  const handleDeleteStudent = async (studentID) => {
    try {
      await axios.delete(`http://localhost:4500/admin/${studentID}`, {
        // Add your authorization header here
      });
      setStudents(students.filter(student => student.studentID !== studentID));
      toast({
        title: 'Student Deleted',
        description: 'The student has been successfully deleted.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error Deleting Student',
        description: 'Failed to delete student',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentStudent(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveStudent = async () => {
    const method = currentStudent.studentID ? 'patch' : 'post';
    const url = currentStudent.studentID ? `http://localhost:4500/admin/students/${currentStudent.studentID}` : `http://localhost:4500/admin/students`;
    try {
      await axios[method](url, currentStudent, {
        // Add your authorization header here
      });
      fetchStudents();  // Refetch students to reflect changes
      toast({
        title: 'Student added successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      closeModal();
    } catch (error) {
      toast({
        title: 'Error saving student',
        description: 'Failed to save student details',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const openModal = (student = { name: '', email: '', studentId: '' }) => {
    setCurrentStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    {/* <AdminNav/> */}
    <Box width="100%" p={4}>
      
      {/* <FormControl mb={4}>
        <FormLabel htmlFor='search'>Search Student</FormLabel>
        <Input
          id='search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email"/>
      </FormControl> */}
      <TableContainer>
        <Table variant="striped" size="sm">
          <Thead>
            <Tr>
              <Th>StudentID</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Grade</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {students.map((student) => (
              <Tr key={student.studentID}>
                <Td>{student.studentID}</Td>
                <Td>{student.name}</Td>
                <Td>{student.email}</Td>
                <Td>{student.grade}</Td>
                <Td>
                  <Button colorScheme="blue" mr={3} onClick={() => openModal(student)}>Edit</Button>
                  <Button colorScheme="red" onClick={() => handleDeleteStudent(student.studentID)}>Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th colSpan="4">
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <StudentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        student={currentStudent}
        onChange={handleChange}
        onSave={handleSaveStudent}
      />
    </Box>
    </>
  );
};

export default StudentList;
