import React from 'react';
import { Box, Heading, Text, Flex, Badge, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const PerformanceCard = ({ performanceData }) => {
  const { email, userName, streamName, totalMarks, subjectDetails } = performanceData;
  const maxMarks = 100 * subjectDetails.length;

  // Calculate final grade
  const calculateFinalGrade = (totalMarks, maxMarks) => {
    const percentage = (totalMarks / maxMarks) * 100;
    if (percentage >= 90) {
      return { grade: 'A+', message: 'Excellent Performance!', color: 'green' };
    } else if (percentage >= 80) {
      return { grade: 'A', message: 'Great Job!', color: 'green' };
    } else if (percentage >= 70) {
      return { grade: 'B+', message: 'Good Effort!', color: 'green' };
    } else if (percentage >= 60) {
      return { grade: 'B', message: 'Keep Improving!', color: 'yellow' };
    } else if (percentage >= 50) {
      return { grade: 'C', message: 'Work Harder!', color: 'yellow' };
    } else if (percentage >= 40) {
      return { grade: 'D', message: 'Room for Improvement!', color: 'orange' };
    } else {
      return { grade: 'F', message: 'Needs Attention!', color: 'red' };
    }
  };

  const finalGradeData = calculateFinalGrade(totalMarks, maxMarks);
  const percentage = ((totalMarks / maxMarks) * 100).toFixed(2);

  return (
    <Box
      maxW="xl"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      p={6}
      mb={6}
      mt={15}
      mx="auto"
      color="black"
      bg="white"
    >
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        Performance Card
      </Heading>
      <Flex direction="column" align="center">
        <Flex columnGap={"2rem"}>
          <Box mb={4} mr={4}>
            <Text fontSize="md" fontWeight="bold">
              Student Name: <Text as="span" color="blue.500">{userName}</Text>
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Email: <Text as="span" color="blue.500">{email}</Text>
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Stream: <Text as="span" color="blue.500">{streamName}</Text>
            </Text>
          </Box>
          <Box mb={4}>
            <Text fontSize="md" fontWeight="bold">
              Total Marks: <Text as="span" color="blue.500">{totalMarks}</Text> / {maxMarks}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Obtained Marks: <Text as="span" color="blue.500">{totalMarks}</Text>
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Total Percentage: <Text as="span" color="blue.500">{percentage}%</Text>
            </Text>
          </Box>
        </Flex>
        <Badge variant="subtle" colorScheme={finalGradeData.color} mb={4}>
          Final Grade: {finalGradeData.grade}
        </Badge>
        <Text fontSize="lg" fontWeight="bold" mb={4} textAlign="center">
          {finalGradeData.message}
        </Text>
        <Table variant="striped" colorScheme="gray" size="md">
          <Thead>
            <Tr>
              <Th>Subject Name</Th>
              <Th>Total Marks</Th>
              <Th>Obtained Marks</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {subjectDetails.map((subject, index) => (
              <Tr key={index}>
                <Td>{subject.SubjectName}</Td>
                <Td>100</Td>
                <Td>{subject.marks}</Td>
                <Td>
                  <Badge
                    variant="subtle"
                    colorScheme={subject.marks >= 40 ? 'green' : 'red'}
                  >
                    {subject.marks >= 40 ? 'Pass' : 'Fail'}
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Text mt={4} textAlign="center">
          Keep up the good work and strive for excellence!
        </Text>
      </Flex>
    </Box>
  );
};

export default PerformanceCard;
