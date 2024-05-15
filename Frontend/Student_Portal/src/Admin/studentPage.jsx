// import {
//   Box,
//   Button,
//   ButtonGroup,
//   Flex,
//   FormControl,
//   FormLabel,
//   Heading,
//   Input,
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   ModalOverlay,
//   Table,
//   TableCaption,
//   TableContainer,
//   Tbody,
//   Td,
//   Text,
//   Textarea,
//   Th,
//   Thead,
//   Tr,
//   useDisclosure,
//   useToast,
// } from "@chakra-ui/react";
// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import { Navbar } from "../Component/Navbar";
// import { Footer } from "../Component/footer";

// let data = {
//   id: 1,
//   title: "",
//   Description: "",
//   source: "",
//   time: 4,
//   articleLink: "",
//   image1: "",
//   image2: "",
//   category: "",
//   clicks: 0,
// };
// let data2 = {
//   title: "",
//   Description: "",
//   source: "",
//   time: 0,
//   articleLink: "",
//   image1: "",
//   image2: "",
//   category: "",
//   clicks: 0,
// };

// const Article = () => {

//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [params, setParams] = useSearchParams();
//   const [selectedItem, setSelectedItem] = useState(data);
//   const [page, setPage] = useState(Number(params.get("_page") || "1"));
//   const [limit] = useState(Number(params.get("_limit") || "5"));
//   const [pages, setpages] = useState(1);
//   const [updateItem, setupdateItem] = useState(selectedItem);
//   const [addNewsModalOpen, setAddNewsModalOpen] = useState(false);
//   const [addedNews, setAddedNews] = useState(data2);

//   const toast = useToast();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setupdateItem({ ...updateItem, [name]: value });
//   };
//   const [students, setStudents] = useState([]);


//   const fetchStudents = async () => {
//     try {
//       const { data } = await axios.get(`http://localhost:4500/admin/students`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       });
//       setStudents(data.users);
//       console.log(data);
//     } catch (error) {
//       toast({
//         title: "Error fetching Students",
//         description: "Failed to fetch Students",
//         status: "error",
//         duration: 9000,
//         isClosable: true,
//       });
//     }
//   };
//   useEffect(() => {
//     fetchStudents();
//   }, []);


//   const handleDelete = (id) => {
//     let examplePromise = deletePost(id);
//     toast.promise(examplePromise, {
//       success: { title: "News removed", description: "Removed Successfull" },
//       error: { title: "Somthing Went Wrong", description: "Something wrong" },
//       loading: { title: "Deleting News", description: "Please wait" },
//     });
//     console.log("Deleting item at index:", id);
//   };

//   const handleOpenUpdate = (item) => {
//     setSelectedItem(item);
//     setupdateItem(item);
//     onOpen();
//   };

//   const handleUpdate = () => {
//     // console.log(updateItem);
//     let examplePromise = patchPost(updateItem);
//     toast.promise(examplePromise, {
//       success: { title: "Update Successfull", description: "News Updated" },
//       error: { title: "Somthing Went Wrong", description: "Something wrong" },
//       loading: { title: "Updating News", description: "Please wait" },
//     });
//     onClose();
//   };

//   const handleCloseModal = () => {
//     setSelectedItem(data);
//     setupdateItem(data);
//     onClose();
//   };

//   const handleAddNewsOpen = () => {
//     setAddNewsModalOpen(true);
//   };

//   const handleAddNewsClose = () => {
//     setAddNewsModalOpen(false);
//   };

//   const handleAddChange = (e) => {
//     const { name, value } = e.target;
//     setAddedNews({ ...addedNews, [name]: value });
//   };
//   const handleAddNews = () => {
//     // console.log(addedNews);
//     setAddedNews(data2);
//     let examplePromise = addPost(addedNews);
//     toast.promise(examplePromise, {
//       success: { title: "Added Successfull", description: "News Added" },
//       error: { title: "Somthing Went Wrong", description: "Something wrong" },
//       loading: { title: "Adding News", description: "Please wait" },
//     });
//     setPage(1);
//     handleAddNewsClose();
//   };
//   // console.log(dataLoading);

//   return (
//     <>
//     <Navbar/>
//       <Box minH={"88vh"} p="4" textAlign={"center"}>
//         <Flex gap={5}>
//           <Button colorScheme="green" onClick={handleAddNewsOpen}>
//             ADD NEW STUDENT
//           </Button>
//         </Flex>
//         <TableContainer whiteSpace={"wrap"}>
//           <Table size={"sm"}>
//             <TableCaption placement={"top"}>
//               <Heading>Student list</Heading>
//             </TableCaption>
//             <Thead>
//               <Tr>
//                 <Th>STUDENT ID</Th>
//                 <Th>NAME</Th>
//                 <Th>EMAIL</Th>
//                 <Th>GRADE</Th>
//                 <Th colSpan={2}>Actions Buttons</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               {students?.length != 0 &&
//                 students?.map((item, index) => (
//                   <Tr>
//                     <Td>
//                       <Text noOfLines={2}>{item.userID}</Text>
//                       {/* <Text noOfLines={2}>Title</Text> */}
//                     </Td>
//                     <Td>
//                       <Text noOfLines={2}>{item.students}</Text>
//                       {/* <Text noOfLines={2}>Description</Text> */}
//                     </Td>
//                     <Td>{item.email}</Td>
//                     {/* <Td>Source</Td> */}
//                     <Td>{item?.streamId}</Td>
//                     {/* <Td>category</Td> */}
//                     <Td>
//                       <Button
//                         colorScheme="blue"
//                         onClick={() => handleOpenUpdate(item)}
//                         // isLoading={dataLoading}
//                       >
//                         Update
//                       </Button>
//                     </Td>
//                     <Td>
//                       <Button
//                         colorScheme="red"
//                         ml={2}
//                         onClick={() => handleDelete(item._id)}
//                         // isLoading={dataLoading}
//                       >
//                         Delete
//                       </Button>
//                     </Td>
//                   </Tr>
//                 ))}
//             </Tbody>
//           </Table>
//         </TableContainer>
//         <ButtonGroup>
//           <Flex alignItems={"center"} gap={2}>
//             <Button
//               isDisabled={page <= 1}
//               onClick={() => setPage((prev) => prev - 1)}
//             >
//               Previous
//             </Button>
//             <Button isDisabled={true}>
//               {page}/{pages}
//             </Button>
//             <Button
//               isDisabled={page === pages}
//               onClick={() => setPage((prev) => prev + 1)}
//             >
//               Next
//             </Button>
//           </Flex>
//         </ButtonGroup>

//         {/* Modal for Update */}
//         <Modal isOpen={isOpen} onClose={handleCloseModal}>
//           <ModalOverlay />
//           <ModalContent>
//             <ModalHeader>Update Item</ModalHeader>
//             <ModalCloseButton />
//             <ModalBody>
//               <Input
//                 type="text"
//                 defaultValue={selectedItem?.title}
//                 name="title"
//                 onChange={handleChange}
//               />
//               <Input
//                 type="text"
//                 defaultValue={selectedItem?.Description}
//                 name="Description"
//                 onChange={handleChange}
//               />
//               <Input
//                 type="text"
//                 defaultValue={selectedItem?.source}
//                 name="source"
//                 onChange={handleChange}
//               />
//               <Input
//                 type="text"
//                 defaultValue={selectedItem?.category}
//                 name="category"
//                 onChange={handleChange}
//               />
//               <Input
//                 type="text"
//                 defaultValue={selectedItem?.articleLink}
//                 name="articleLink"
//                 onChange={handleChange}
//               />
//             </ModalBody>
//             <ModalFooter>
//               <Button
//                 colorScheme="blue"
//                 mr={3}
//                 onClick={handleUpdate}
//                 // isLoading={dataLoading}
//               >
//                 Update
//               </Button>
//               <Button onClick={handleCloseModal}>Cancel</Button>
//             </ModalFooter>
//           </ModalContent>
//         </Modal>

//         {/* Add News Modal */}
//         <Modal isOpen={addNewsModalOpen} onClose={handleAddNewsClose}>
//           <ModalOverlay />
//           <ModalContent>
//             <ModalHeader>Add News</ModalHeader>
//             <ModalCloseButton />
//             <ModalBody>
//               <FormControl>
//                 <FormLabel>News Title</FormLabel>
//                 <Input
//                   type="text"
//                   placeholder="Title"
//                   name="title"
//                   value={addedNews?.title}
//                   onChange={handleAddChange}
//                 />
//               </FormControl>
//               <FormControl>
//                 <FormLabel>News Description</FormLabel>
//                 <Textarea
//                   placeholder="Description"
//                   name="Description"
//                   value={addedNews?.Description}
//                   onChange={(e) => {
//                     setAddedNews({ ...addedNews, Description: e.target.value });
//                   }}
//                 />
//               </FormControl>
//               <FormControl>
//                 <FormLabel>News Source</FormLabel>
//                 <Input
//                   type="text"
//                   placeholder="Source"
//                   name="source"
//                   value={addedNews?.source}
//                   onChange={handleAddChange}
//                 />
//               </FormControl>
//               <FormControl>
//                 <FormLabel>Time</FormLabel>
//                 <Input
//                   type="text"
//                   placeholder="Time"
//                   name="time"
//                   value={addedNews?.time}
//                   onChange={handleAddChange}
//                 />
//               </FormControl>
//               <FormControl>
//                 <FormLabel>Article Link</FormLabel>
//                 <Input
//                   type="text"
//                   placeholder="Article Link"
//                   name="articleLink"
//                   value={addedNews?.articleLink}
//                   onChange={handleAddChange}
//                 />
//               </FormControl>
//               <FormControl>
//                 <FormLabel>Article Image1 Link</FormLabel>
//                 <Input
//                   type="text"
//                   placeholder="Image Link 1"
//                   name="image1"
//                   value={addedNews?.image1}
//                   onChange={handleAddChange}
//                 />
//               </FormControl>
//               <FormControl>
//                 <FormLabel>Article Image2 Link</FormLabel>
//                 <Input
//                   type="text"
//                   placeholder="Image Link 2"
//                   name="image2"
//                   value={addedNews?.image2}
//                   onChange={handleAddChange}
//                 />
//               </FormControl>
//               <FormControl>
//                 <FormLabel>News Category</FormLabel>
//                 <Input
//                   type="text"
//                   placeholder="Category"
//                   name="category"
//                   value={addedNews?.category}
//                   onChange={handleAddChange}
//                 />
//               </FormControl>
//             </ModalBody>
//             <ModalFooter>
//               <Button
//                 colorScheme="blue"
//                 mr={3}
//                 onClick={handleAddNews}
//                 // isLoading={dataLoading}
//               >
//                 Add News
//               </Button>
//               <Button onClick={handleAddNewsClose}>Cancel</Button>
//             </ModalFooter>
//           </ModalContent>
//         </Modal>
//       </Box>
//       <Footer/>
//     </>
//   );
// };

// export default Article;
