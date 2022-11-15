import React, { useState, useEffect } from 'react';
import {
  Box,
  ChakraProvider,
  Container,
  Portal,
  Flex,
  Link,
  HStack,
  Image,
  Button,
  Text,
  useColorModeValue,
  SimpleGrid,
  Input, Grid, GridItem,
  InputGroup, InputLeftAddon, InputRightAddon,
  Tabs, TabList, TabPanels, Tab, TabPanel,
  useToast,
  chakra
} from "@chakra-ui/react";
import Layout from './components/Layout'

import { useNavigate } from 'react-router-dom';
import { supabase } from './components/supabase';

const TambahDataMax = () => {
  const navigateTo = useNavigate();
  const [vlogin, setVLogin] = useState('false');

  const [C1X1, setC1X1] = useState('');
  const [C1X2, setC1X2] = useState('');
  const [C1X3, setC1X3] = useState('');
  const [C1LessThan, setC1LessThan] = useState('');
  const [C1Low, setC1Low] = useState('');
  const [C1Up, setC1Up] = useState('');

  const [C2X1, setC2X1] = useState('');
  const [C2X2, setC2X2] = useState('');
  const [C2X3, setC2X3] = useState('');
  const [C2LessThan, setC2LessThan] = useState('');
  const [C2Low, setC2Low] = useState('');
  const [C2Up, setC2Up] = useState('');

  const [C3X1, setC3X1] = useState('');
  const [C3X2, setC3X2] = useState('');
  const [C3X3, setC3X3] = useState('');
  const [C3LessThan, setC3LessThan] = useState('');
  const [C3Low, setC3Low] = useState('');
  const [C3Up, setC3Up] = useState('');

  const [ObjectiveX1, setObjectiveX1] = useState('');
  const [ObjectiveX2, setObjectiveX2] = useState('');
  const [ObjectiveX3, setObjectiveX3] = useState('');

  const [ResultObj, setResultObj] = useState('');
  const [ResultX1, setResultX1] = useState('');
  const [ResultX2, setResultX2] = useState('');
  const [ResultX3, setResultX3] = useState('');

  const [users, setUsers] = useState(null);
  const [exams, setExams] = useState(null);

  const toast = useToast();
  
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    var session = JSON.parse(localStorage.getItem('session'));
    const user = await supabase.auth.getUser();
    setUsers(user);

    let exam_max = await supabase
    .from('exam_maximizes')
    .select('*')
    .eq('kelompok', user.data.user.user_metadata.kelompok)
    .eq('anggota', user.data.user.user_metadata.anggota)
    .limit(1)
    .single();

    setExams(exam_max.data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(C1X1 != exams.constraint_1_x1) {
      showToast('Constraint 1', 'X1 salah!', 'error');
    } else if(C1X2 != exams.constraint_1_x2) {
      showToast('Constraint 1', 'X2 salah!', 'error');
    }else if(C1X3 != exams.constraint_1_x3) {
      showToast('Constraint 1', 'X3 salah!', 'error');
    } else if(C1LessThan != exams.constraint_1_lessthan) {
      showToast('Constraint 1', 'Less than salah!', 'error');
    } else if(C1Low != exams.constraint_1_low) {
      showToast('Constraint 1', 'Low salah!', 'error');
    } else if(C1Up != exams.constraint_2_up) {
      showToast('Constraint 1', 'Up salah!', 'error');
    } else if(C2X1 != exams.constraint_2_x1) {
      showToast('Constraint 2', 'X1 salah!', 'error');
    } else if(C2X2 != exams.constraint_2_x2) {
      showToast('Constraint 2', 'X2 salah!', 'error');
    }else if(C2X3 != exams.constraint_2_x3) {
      showToast('Constraint 2', 'X3 salah!', 'error');
    } else if(C2LessThan != exams.constraint_2_lessthan) {
      showToast('Constraint 2', 'Less than salah!', 'error');
    } else if(C2Low != exams.constraint_2_low) {
      showToast('Constraint 2', 'Low salah!', 'error');
    } else if(C2Up != exams.constraint_2_up) {
      showToast('Constraint 2', 'Up salah!', 'error');
    } else if(C3X1 != exams.constraint_3_x1) {
      showToast('Constraint 3', 'X1 salah!', 'error');
    } else if(C3X2 != exams.constraint_3_x2) {
      showToast('Constraint 3', 'X2 salah!', 'error');
    }else if(C3X3 != exams.constraint_3_x3) {
      showToast('Constraint 3', 'X3 salah!', 'error');
    } else if(C3LessThan != exams.constraint_3_lessthan) {
      showToast('Constraint 3', 'Less than salah!', 'error');
    } else if(C3Low != exams.constraint_3_low) {
      showToast('Constraint 3', 'Low salah!', 'error');
    } else if(C3Up != exams.constraint_3_up) {
      showToast('Constraint 3', 'Up salah!', 'error');
    } else if(ObjectiveX1 != exams.objective_x1) {
      showToast('Objective', 'X1 salah!', 'error');
    } else if(ObjectiveX2 != exams.objective_x2) {
      showToast('Objective', 'X2 salah!', 'error');
    }else if(ObjectiveX3 != exams.objective_x3) {
      showToast('Objective', 'X3 salah!', 'error');
    } else if(ResultObj != exams.result_obj) {
      showToast('Result', 'Objective salah!', 'error');
    } else if(ResultX1 != exams.result_x1) {
      showToast('Result', 'X1 salah!', 'error');
    } else if(ResultX2 != exams.result_x2) {
      showToast('Result', 'X2 salah!', 'error');
    }else if(ResultX3 != exams.result_x3) {
      showToast('Result', 'X3 salah!', 'error');
    } else {
      alert("oke");
      await supabase
      .from('exam_maximizes')
      .update({
          "status": 1
      })
      .eq('kelompok', users.data.user.user_metadata.kelompok)
      .eq('anggota', users.data.user.user_metadata.anggota)
      .then(async ({ data, error }) => {
          if(error) {
            console.log(error.message);
            alert("error");
          } else {
            navigateTo('/InputData');       
          }
      });
    }
  };

  function showToast(title, desc, status) {
    toast({
      title: title,
      description: desc,
      status: status,
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <Box>
      <Layout />
      <Box mt="85px" bg="#f6f6f6" p="5" >
        <Text ml="10" color="#000">Tambah Data</Text>
      </Box>
      <chakra.form onSubmit={handleSubmit}>
        <Box size="md">
          <SimpleGrid columns={{ sm: 1, lg: 3 }} spacing={5} p="20" mt="-10" >
            <Box border="2px solid #f7f7f7" p="5" borderRadius="5px">
              <Text fontSize="20px" mb="5">
                Constraint_1
              </Text>
              <Grid templateColumns='repeat(6, 1fr)' gap={2}>
                <GridItem  >
                  <Text fontSize="15px" align="center">X1</Text>
                  <Input type='number' step="0.01" placeholder='' 
                    onChange={
                      (event) => {
                        setC1X1(event.target.value);
                      }
                    }
                  />
                </GridItem>
                <GridItem  >
                  <Text fontSize="15px" align="center">X2</Text>
                  <Input type='number' step="0.01" placeholder='' 
                    onChange={
                      (event) => {
                        setC1X2(event.target.value);
                      }
                    }
                  />
                </GridItem>
                
                <GridItem  >
                  <Text fontSize="15px" align="center">X3</Text>
                  <Input type='number' step="0.01" placeholder='' 
                    onChange={
                      (event) => {
                        setC1X3(event.target.value);
                      }
                    }
                  />
                </GridItem>

                <GridItem  >
                  <Text fontSize="15px" align="center">''</Text>
                  <Input type='number' step="0.01" placeholder='' 
                    onChange={
                      (event) => {
                        setC1LessThan(event.target.value);
                      }
                    }
                  />
                </GridItem>
                <GridItem >
                  <Text fontSize="15px" align="center">lowBound</Text>
                  <Input type='number' step="0.01" placeholder='' 
                    onChange={
                      (event) => {
                        setC1Low(event.target.value);
                      }
                    }
                  />
                </GridItem>
                <GridItem >
                  <Text fontSize="15px" align="center">upBound</Text>
                  <Input type='number' step="0.01" placeholder='' 
                    onChange={
                      (event) => {
                        setC1Up(event.target.value);
                      }
                    }
                  />
                </GridItem>
              </Grid>
            </Box>
  
            <Box border="2px solid #f7f7f7" p="5" borderRadius="5px">
              <Text fontSize="20px" mb="5">
                Constraint_2
              </Text>
              <Grid templateColumns='repeat(6, 1fr)' gap={2}>
                <GridItem  >
                  <Text fontSize="15px" align="center">X1</Text>
                  <Input type='number' step="0.01" placeholder='' 
                    onChange={
                      (event) => {
                        setC2X1(event.target.value);
                      }
                    }
                  />
                </GridItem>
                <GridItem  >
                  <Text fontSize="15px" align="center">X2</Text>
                  <Input type='number' step="0.01" placeholder='' 
                    onChange={
                      (event) => {
                        setC2X2(event.target.value);
                      }
                    }
                  />
                </GridItem>
                <GridItem  >
                  <Text fontSize="15px" align="center">X3</Text>
                  <Input type='number' step="0.01" placeholder='' 
                    onChange={
                      (event) => {
                        setC2X3(event.target.value);
                      }
                    }
                  />
                </GridItem>
                <GridItem  >
                  <Text fontSize="15px" align="center">''</Text>
                  <Input type='number' step="0.01" placeholder='' 
                    onChange={
                      (event) => {
                        setC2LessThan(event.target.value);
                      }
                    }
                  />
                </GridItem>
                <GridItem >
                  <Text fontSize="15px" align="center">lowBound</Text>
                  <Input type='number' step="0.01" placeholder='' 
                    onChange={
                      (event) => {
                        setC2Low(event.target.value);
                      }
                    }
                  />
                </GridItem>
                <GridItem >
                  <Text fontSize="15px" align="center">upBound</Text>
                  <Input type='number' step="0.01" placeholder='' 
                    onChange={
                      (event) => {
                        setC2Up(event.target.value);
                      }
                    }
                  />
                </GridItem>
              </Grid>
            </Box>
  
            <Box border="2px solid #f7f7f7" p="5" borderRadius="5px">
              <Text fontSize="20px" mb="5">
                Constraint_3
              </Text>
              <Grid templateColumns='repeat(6, 1fr)' gap={2}>
                <GridItem  >
                  <Text fontSize="15px" align="center">X1</Text>
                  <Input type='number' step="0.01" placeholder='' 
                    onChange={
                      (event) => {
                        setC3X1(event.target.value);
                      }
                    }
                  />
                </GridItem>
                <GridItem  >
                  <Text fontSize="15px" align="center">X2</Text>
                  <Input type='number' step="0.01" placeholder='' 
                    onChange={
                      (event) => {
                        setC3X2(event.target.value);
                      }
                    }
                  />
                </GridItem>
                <GridItem  >
                  <Text fontSize="15px" align="center">X3</Text>
                  <Input type='number' step="0.01" placeholder='' 
                    onChange={
                      (event) => {
                        setC3X3(event.target.value);
                      }
                    }
                  />
                </GridItem>
                <GridItem  >
                  <Text fontSize="15px" align="center">''</Text>
                  <Input type='number' step="0.01" placeholder='' 
                    onChange={
                      (event) => {
                        setC3LessThan(event.target.value);
                      }
                    }
                  />
                </GridItem>
                <GridItem >
                  <Text fontSize="15px" align="center">lowBound</Text>
                  <Input type='number' step="0.01" placeholder='' 
                    onChange={
                      (event) => {
                        setC3Low(event.target.value);
                      }
                    }
                  />
                </GridItem>
                <GridItem >
                  <Text fontSize="15px" align="center">upBound</Text>
                  <Input type='number' step="0.01" placeholder='' 
                    onChange={
                      (event) => {
                        setC3Up(event.target.value);
                      }
                    }
                  />
                </GridItem>
              </Grid>
            </Box>
          </SimpleGrid>
  
          <SimpleGrid columns={{ sm: 1, lg: 2 }} spacing={5} p="20" mt="-150px" >
            <Box border="2px solid #f7f7f7" p="5" borderRadius="5px">
              <Text fontSize="20px" mb="5">
                Objective
              </Text>
              <Grid templateColumns='repeat(3, 1fr)' gap={2}>
                <GridItem  >
                  <Text fontSize="15px" align="center">X1</Text>
                  <Input type='number' step="0.01" placeholder='' 
                    onChange={
                      (event) => {
                        setObjectiveX1(event.target.value);
                      }
                    }
                  />
                </GridItem>
                <GridItem  >
                  <Text fontSize="15px" align="center">X2</Text>
                  <Input type='number' step="0.01" placeholder='' 
                    onChange={
                      (event) => {
                        setObjectiveX2(event.target.value);
                      }
                    }
                  />
                </GridItem>

                <GridItem  >
                  <Text fontSize="15px" align="center">X3</Text>
                  <Input type='number' step="0.01" placeholder='' 
                    onChange={
                      (event) => {
                        setObjectiveX3(event.target.value);
                      }
                    }
                  />
                </GridItem>
              </Grid>
            </Box>
  
            <Box border="2px solid #f7f7f7" p="5" borderRadius="5px">
              <Text fontSize="20px" mb="5">
                Result
              </Text>
              <Grid templateColumns='repeat(4, 1fr)' gap={2}>
                <GridItem  >
                  <Text fontSize="15px" align="center">Obj</Text>
                  <Input type='number' step="0.01" placeholder='' 
                    onChange={
                      (event) => {
                        setResultObj(event.target.value);
                      }
                    }
                  />
                </GridItem>
  
                <GridItem  >
                  <Text fontSize="15px" align="center">X1</Text>
                  <Input type='number' step="0.01" placeholder='' 
                    onChange={
                      (event) => {
                        setResultX1(event.target.value);
                      }
                    }
                  />
                </GridItem>
  
                <GridItem  >
                  <Text fontSize="15px" align="center">X2</Text>
                  <Input type='number' step="0.01" placeholder='' 
                    onChange={
                      (event) => {
                        setResultX2(event.target.value);
                      }
                    }
                  />
                </GridItem>

                <GridItem  >
                  <Text fontSize="15px" align="center">X3</Text>
                  <Input type='number' step="0.01" placeholder='' 
                    onChange={
                      (event) => {
                        setResultX3(event.target.value);
                      }
                    }
                  />
                </GridItem>
  
              </Grid>
  
            </Box>
  
  
          </SimpleGrid>
  
          <Flex mt="-10" justifyContent="center">
            <Button bg={"#326fac"}
              type="submit"
              color={"white"}
              _hover={{
                bg: "#5B5A68",
              }}>SUBMIT</Button>
          </Flex>
  
  
        </Box>
      </chakra.form>

    </Box>
  )

}
export default TambahDataMax;