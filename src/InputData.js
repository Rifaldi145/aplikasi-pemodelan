import {
    Box,
    ChakraProvider,
    Portal,
    Flex,
    Link,
    HStack,
    Image,
    Button,
    Text,
    useColorModeValue,
    SimpleGrid,
    Grid, GridItem,
    Stack,
    Tabs, TabList, TabPanels, Tab, TabPanel,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer, Center,Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,useDisclosure 
  } from "@chakra-ui/react";
  import Layout from './components/Layout'
  import React, { useState, useEffect } from 'react';
  import { supabase } from './components/supabase';
  
  import { useNavigate } from 'react-router-dom';
  
  const InputData = () => {
  
    const navigateTo = useNavigate();
    const [dataMax, setDataMax] = useState([]);
    const [dataMin, setDataMin] = useState([]);
    const [users, setUsers] = useState(null);

    const [openGrafixMax, setOpenGrafikMax] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen1, onOpen1, onClose1 } = useDisclosure()
  
    useEffect(() => {
      getDataMinMax();
    }, []);
  
    const getDataMinMax = async () => {
      var session = JSON.parse(localStorage.getItem('session'));
      const user = await supabase.auth.getUser();
      if (!user) {
        navigateTo("/");
      } else {
        setUsers(user);
      }
      console.log('OK :', user.data.user.user_metadata.kelompok);
  
      let exam_max = await supabase
        .from('exam_maximizes')
        .select('*')
        .eq('kelompok', user.data.user.user_metadata.kelompok)
        .eq('status', 1);
  
      console.log("exam_max", exam_max);
  
      setDataMax(exam_max.data);
  
      let exam_min = await supabase
        .from('exam_minimizes')
        .select('*')
        .eq('kelompok', user.data.user.user_metadata.kelompok)
        .eq('status', 1);

        console.log("exam_min", exam_min);
  
      setDataMin(exam_min.data);
    };

    const  grafikMaximize = async (event) => {
      event.preventDefault();
      if(dataMax.status == '1'){
        alert("Error2");
      }else{
        
        await supabase
        .from('exam_maximizes')
        .update({
            "grafik": 1
        })
        .eq('kelompok', users.data.user.user_metadata.kelompok)
        .eq('status', 1)
        .then(async ({ data, error }) => {
            if(error) {
              console.log(error);
              alert("error",error);
            } else {
              alert("Grafik Berhasil Dibuat");
              navigateTo("/Grafik");     
            }
        });
      }
      
   };
  
    const  grafikMinimize = async (event) => {
      event.preventDefault();
      if(dataMin.status == '1'){
        alert("Error2");
      }else{
        
        await supabase
        .from('exam_minimizes')
        .update({
            "grafik": 1
        })
        .eq('kelompok', users.data.user.user_metadata.kelompok)
        .eq('status', 1)
        .then(async ({ data, error }) => {
            if(error) {
              console.log(error);
              alert("error",error);
            } else {
              alert("Grafik Berhasil Dibuat");
              navigateTo("/Grafik");     
            }
        });
      }
      
   };

    return (
      <Box>
        <Layout />
        <Box mt="85px" bg="#f6f6f6" p="5" >
          <Text ml="10" color="#000">Input Data</Text>
        </Box>
        <Box size="md">
  
          <Tabs p="20" mt="-50px">
            <TabList>
              <Tab>Maximize</Tab>
              <Tab>Minimize</Tab>
  
            </TabList>
  
            <TabPanels>
              <TabPanel>
  
                <Box align="right">
                  <Link
                    py="2.5"
                    px="4"
                    rounded="md"
                    color="white"
                    bg="#7ebdfc"
                    _hover={{
                      textDecoration: "none",
                    }}
                    fontSize={{ base: 12, lg: 14 }}
                    href="/TambahDataMax"
                  >
                    <strong>Tambah Data</strong>
                  </Link>
                </Box>
  
                <TableContainer mt="10">
                  <Table variant='striped' >
                    <Thead>
                      <Tr>
                        <Th rowSpan="3" bg="#f5f5f5">Urutan Anggota</Th>
                        <Th colSpan="25" bg="#f5f5f5"></Th>
                      </Tr>
                      <Tr >
                        <Th colSpan="6" bg="#c1c1c1" >constraint_1</Th>
                        <Th colSpan="6" bg="#ececec">constraint_2</Th>
                        <Th colSpan="6" bg="#c1c1c1">constraint_3</Th>
                        <Th colSpan="3" bg="#ececec">objective</Th>
                        <Th colSpan="4" bg="#c1c1c1">hasil</Th>
                      </Tr>
                      <Tr>
                        <Td bg="#c1c1c1">X1</Td>
                        <Td bg="#c1c1c1">X2</Td>
                        <Td bg="#c1c1c1">X3</Td>
                        <Td bg="#c1c1c1">&</Td>
                        <Td bg="#c1c1c1">low</Td>
                        <Td bg="#c1c1c1">up</Td>
  
                        <Td bg="#ececec">X1</Td>
                        <Td bg="#ececec">X2</Td>
                        <Td bg="#ececec">X3</Td>
                        <Td bg="#ececec">&</Td>
                        <Td bg="#ececec">low</Td>
                        <Td bg="#ececec">up</Td>
  
                        <Td bg="#c1c1c1">X1</Td>
                        <Td bg="#c1c1c1">X2</Td>
                        <Td bg="#c1c1c1">X3</Td>
                        <Td bg="#c1c1c1">&</Td>
                        <Td bg="#c1c1c1">low</Td>
                        <Td bg="#c1c1c1">up</Td>
  
                        <Td bg="#ececec">X1</Td>
                        <Td bg="#ececec">X2</Td>
                        <Td bg="#ececec">X3</Td>
  
                        <Td bg="#c1c1c1">Obj</Td>
                        <Td bg="#c1c1c1">X1</Td>
                        <Td bg="#c1c1c1">X2</Td>
                        <Td bg="#c1c1c1">X3</Td>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {dataMax.map(function(rows, i) {
                        return (
                          <Tr key={i}>
                            <Td>
                              {rows.anggota}
                            </Td>
                            <Td>
                              {rows.constraint_1_x1}
                            </Td>
                            <Td>
                              {rows.constraint_1_x2}
                            </Td>
                            <Td>
                              {rows.constraint_1_x3}
                            </Td>
                            <Td>
                              {rows.constraint_1_lessthan}
                            </Td>
                            <Td>
                              {rows.constraint_1_low}
                            </Td>
                            <Td>
                              {rows.constraint_1_up}
                            </Td>
  
                            <Td>
                              {rows.constraint_2_x1}
                            </Td>
                            <Td>
                              {rows.constraint_2_x2}
                            </Td>
                            <Td>
                              {rows.constraint_2_x3}
                            </Td>
                            <Td>
                              {rows.constraint_2_lessthan}
                            </Td>
                            <Td>
                              {rows.constraint_2_low}
                            </Td>
                            <Td>
                              {rows.constraint_2_up}
                            </Td>
  
                            <Td>
                              {rows.constraint_3_x1}
                            </Td>
                            <Td>
                              {rows.constraint_3_x2}
                            </Td>
                            <Td>
                              {rows.constraint_3_x3}
                            </Td>
                            <Td>
                              {rows.constraint_3_lessthan}
                            </Td>
                            <Td>
                              {rows.constraint_3_low}
                            </Td>
                            <Td>
                              {rows.constraint_3_up}
                            </Td>
  
                            <Td>
                              {rows.objective_x1}
                            </Td>
                            <Td>
                              {rows.objective_x2}
                            </Td>
                            <Td>
                              {rows.objective_x3}
                            </Td>
  
                            <Td>
                              {rows.result_obj}
                            </Td>
                            <Td>
                              {rows.result_x1}
                            </Td>
                            <Td>
                              {rows.result_x2}
                            </Td>
                            <Td>
                              {rows.result_x3}
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
                {
                  dataMax.length == 2 ?
                  <Box mt="4" align="center">
                      <Button
                        py="2.5"
                        px="4"
                        rounded="md"
                        color="white"
                        bg="#326fac"
                        _hover={{
                          textDecoration: "none",
                        }}
                        fontSize={{ base: 12, lg: 14 }}
                        onClick={() => {
                          
                          setOpenGrafikMax(true);
                      }}
                      >
                        <strong>Buat Grafik Maximize</strong>
                      </Button>
                    </Box>
                    : <></>
                }
  
              </TabPanel>
              <TabPanel>
                <Box align="right">
                  <Link
                    py="2.5"
                    px="4"
                    rounded="md"
                    color="white"
                    bg="#7ebdfc"
                    _hover={{
                      textDecoration: "none",
                    }}
                    fontSize={{ base: 12, lg: 14 }}
                    href="/TambahDataMin"
                  >
                    <strong>Tambah Data</strong>
                  </Link>
                </Box>
  
                <TableContainer mt="10">
                  <Table variant='striped' >
                    <Thead>
                      <Tr>
                        <Th rowSpan="3" bg="#f5f5f5">Urutan Anggota</Th>
                        <Th colSpan="25" bg="#f5f5f5"></Th>
                      </Tr>
                      <Tr >
                        <Th colSpan="6" bg="#c1c1c1" >constraint_1</Th>
                        <Th colSpan="6" bg="#ececec">constraint_2</Th>
                        <Th colSpan="6" bg="#c1c1c1">constraint_3</Th>
                        <Th colSpan="3" bg="#ececec">objective</Th>
                        <Th colSpan="4" bg="#c1c1c1">hasil</Th>
                      </Tr>
                      <Tr>
                        <Td bg="#c1c1c1">X1</Td>
                        <Td bg="#c1c1c1">X2</Td>
                        <Td bg="#c1c1c1">X3</Td>
                        <Td bg="#c1c1c1">&</Td>
                        <Td bg="#c1c1c1">low</Td>
                        <Td bg="#c1c1c1">up</Td>
  
                        <Td bg="#ececec">X1</Td>
                        <Td bg="#ececec">X2</Td>
                        <Td bg="#ececec">X3</Td>
                        <Td bg="#ececec">&</Td>
                        <Td bg="#ececec">low</Td>
                        <Td bg="#ececec">up</Td>
  
                        <Td bg="#c1c1c1">X1</Td>
                        <Td bg="#c1c1c1">X2</Td>
                        <Td bg="#c1c1c1">X3</Td>
                        <Td bg="#c1c1c1">&</Td>
                        <Td bg="#c1c1c1">low</Td>
                        <Td bg="#c1c1c1">up</Td>
  
                        <Td bg="#ececec">X1</Td>
                        <Td bg="#ececec">X2</Td>
                        <Td bg="#ececec">X3</Td>
  
                        <Td bg="#c1c1c1">Obj</Td>
                        <Td bg="#c1c1c1">X1</Td>
                        <Td bg="#c1c1c1">X2</Td>
                        <Td bg="#c1c1c1">X3</Td>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {dataMin.map(function(rows, i) {
                        return (
                          <Tr key={i}>
                            <Td>
                              {rows.anggota}
                            </Td>
                            <Td>
                              {rows.constraint_1_x1}
                            </Td>
                            <Td>
                              {rows.constraint_1_x2}
                            </Td>
                            <Td>
                              {rows.constraint_1_x3}
                            </Td>
                            <Td>
                              {rows.constraint_1_greaterthan}
                            </Td>
                            <Td>
                              {rows.constraint_1_low}
                            </Td>
                            <Td>
                              {rows.constraint_1_up}
                            </Td>
  
                            <Td>
                              {rows.constraint_2_x1}
                            </Td>
                            <Td>
                              {rows.constraint_2_x2}
                            </Td>
                            <Td>
                              {rows.constraint_2_x3}
                            </Td>
                            <Td>
                              {rows.constraint_2_greaterthan}
                            </Td>
                            <Td>
                              {rows.constraint_2_low}
                            </Td>
                            <Td>
                              {rows.constraint_2_up}
                            </Td>
  
                            <Td>
                              {rows.constraint_3_x1}
                            </Td>
                            <Td>
                              {rows.constraint_3_x2}
                            </Td>
                            <Td>
                              {rows.constraint_3_x3}
                            </Td>
                            <Td>
                              {rows.constraint_3_greaterthan}
                            </Td>
                            <Td>
                              {rows.constraint_3_low}
                            </Td>
                            <Td>
                              {rows.constraint_3_up}
                            </Td>
  
                            <Td>
                              {rows.objective_x1}
                            </Td>
                            <Td>
                              {rows.objective_x2}
                            </Td>
                            <Td>
                              {rows.objective_x3}
                            </Td>
  
                            <Td>
                              {rows.result_obj}
                            </Td>
                            <Td>
                              {rows.result_x1}
                            </Td>
                            <Td>
                              {rows.result_x2}
                            </Td>
                            <Td>
                              {rows.result_x3}
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
  
                  </Table>
                </TableContainer>
                {
                  dataMin.length == 2 ?
                    <Box mt="4" align="center">
                      <Button
                        py="2.5"
                        px="4"
                        rounded="md"
                        color="white"
                        bg="#326fac"
                        _hover={{
                          textDecoration: "none",
                        }}
                        fontSize={{ base: 12, lg: 14 }}
                        onClick={onOpen}
                      >
                        <strong>Buat Grafik Minimize</strong>
                      </Button>
                    </Box>
                    : <></>
                }
              </TabPanel>
  
            </TabPanels>
          </Tabs>

          <Modal isOpen={openGrafixMax} >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Grafik Maximize</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                    <Text>Data tidak bisa diubah setelah membuat grafik</Text>
              </ModalBody>

              <ModalFooter justifyContent="center">
                <Button colorScheme='blue' mr={3}  onClick={() => {setOpenGrafikMax(false);}} size="sm">
                  Batal
                </Button>
                <Button colorScheme='blue' mr={3} onClick={grafikMaximize} size="sm">
                  Buat
                </Button>
              
              </ModalFooter>
            </ModalContent>
          </Modal>
                
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Grafik Minimize</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                    <Text>Data tidak bisa diubah setelah membuat grafik</Text>
              </ModalBody>

              <ModalFooter justifyContent="center">
                <Button colorScheme='blue' mr={3} onClick={onClose} size="sm">
                  Batal
                </Button>
                <Button colorScheme='blue' mr={3} onClick={grafikMinimize} size="sm">
                  Buat
                </Button>
              
              </ModalFooter>
            </ModalContent>
          </Modal>


        </Box>
  
      </Box>
    )
  
  }
  export default InputData;