import { useRef, useState } from 'react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Image,
  Stack,
  Link,
  Button,
  Grid, GridItem, Select,
  Text, Tabs, TabList, TabPanels, Tab, TabPanel
} from '@chakra-ui/react'
import { supabase } from './components/supabase';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const navigateTo = useNavigate();

  const [email, setEmail] = useState('');
  const [nama, setNama] = useState('');
  const [kelompok, setKelompok] = useState('');
  const [anggota, setAnggota] = useState('');
  const [password, setPassword] = useState('123456');

  const [LMsg, setLMsg] = useState('');

  const [loading, setLoading] = useState(false);

  const handleLoginMagicLink = async () => {
    console.log("DATA EMAIL", email);
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
    })
    if (error) {
      alert("Maaf Email anda tidak terdaftar atau cek email anda");
      console.log(error);
    } else {
      console.log(data);
      localStorage.setItem('session', JSON.stringify(data.session));
      setLoading(true);
    // alert("Anda Berhasil Login");
    // navigateTo("/Dashboard");
    }
  };

  const handleLogin = async () => {
    console.log("DATA EMAIL", email);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      alert("Email anda tidak terdaftar!");
      console.log(error);
    } else {
      console.log(data);
      localStorage.setItem('session', JSON.stringify(data.session));
      alert("Anda Berhasil Login");
      navigateTo("/Dashboard");
    }
  };

  const handleSignUp = async () => {
    console.log("Create EMAIL", email);
    console.log("Create Password", password);
    const { data, error } = await supabase.auth.signUp(
      {
        email: email,
        password: password,
        options: {
          data: {
            nama: nama,
            kelompok: kelompok,
            anggota: anggota
          }
        }
      }
    )
    if (error) {
      setLMsg(error.message)
      console.log(error);
    } else {
      alert("Cek email untuk aktifasi akun anda");

      console.log(data.session)
    }
  };


  const changeEmail = (event) => {
    setEmail(event.target.value);
  };
  const changeNama = (event) => {
    setNama(event.target.value);
  };
  const changeKelompok = (event) => {
    setKelompok(event.target.value);
  };
  const changeAnggota = (event) => {
    setAnggota(event.target.value);
  };
  const changePassword = (event) => {
    setPassword(event.target.value);
  };


  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg="#d4d4d4"
    >
      <Stack
        spacing={5}
        mx={"auto"}
        width={[
          "100%",
          "80%",
          "60%",
          "40%",
        ]}
        py={12}
        px={6}
      >
        <Tabs variant="soft-rounded">
          <TabList justifyContent="right" colorScheme="blue">
            <Tab>Masuk</Tab>
            <Tab>Daftar</Tab>

          </TabList>

          <TabPanels>
            <TabPanel>
              <Box borderRadius="10px" bg={"#FFFFFF"} p={5} >
                <Box align={"center"}>
                  <Text fontWeight='600' fontSize="20px">Aplikasi Pemodelan</Text>
                </Box>

                <Stack spacing={4} mt="10">
                  <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} mt="-5">
                    <GridItem colSpan={2} p={1}>
                      <FormControl id="email">
                        <FormLabel fontFamily='Inter' fontWeight='600' fontSize="14px">
                          Email
                        </FormLabel>
                        <Input
                          type="text"
                          onChange={changeEmail}
                          placeholder="Masukan Email"
                          borderRadius="20px"
                          bg="#FAFAFA"
                          border="1px solid #E6E6E6"
                          h="45px"
                        />
                      </FormControl>
                    </GridItem>

                    {
                        loading ?
                        (
                            <GridItem colSpan={2} p={1}>
                                    <Text align="center" color="#2c6f05"  fontSize="12px">Silahkan Cek Email Anda</Text>
                            </GridItem>
                        ) :
                        (
                            <></>
                        )
                    }
                   




                  </Grid>
                </Stack>

                <Stack spacing={10} align={"center"} mt="3">

                  <Button
                    onClick={handleLogin}
                    bg={"#7ebd5a"}
                    color={"white"}
                    _hover={{
                      bg: "#5B5A68",
                    }}
                    fontFamily="Inter"
                    fontWeight="700"
                    fontSize="14px"
                    border="1px solid #C1C1C1"
                    borderRadius='25px'
                    width={[
                      "100%",
                      "80%",
                      "60%",
                      "40%",
                    ]}
                  >

                    Masuk

                  </Button>


                </Stack>


              </Box>
            </TabPanel>
            <TabPanel>
              <Box borderRadius="10px" bg={"#FFFFFF"} p={5} >
                <Box align={"center"}>
                  <Text fontWeight='600' fontSize="20px">Aplikasi Pemodelan</Text>
                </Box>

                <Stack spacing={4} mt="10">
                  <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} mt="-5">
                    <GridItem colSpan={2} p={1}>
                      <FormControl id="email">
                        <FormLabel fontFamily='Inter' fontWeight='600' fontSize="14px">
                          Nama Lengkap
                        </FormLabel>
                        <Input
                          type="text"
                          onChange={changeNama}
                          placeholder="Masukan Nama Lengkap"
                          borderRadius="20px"
                          bg="#FAFAFA"
                          border="1px solid #E6E6E6"
                          h="45px"
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={2} p={1}>
                      <FormControl id="email">
                        <FormLabel fontFamily='Inter' fontWeight='600' fontSize="14px">Email </FormLabel>
                        <Input
                          type="text"
                          onChange={changeEmail}
                          placeholder="Masukan Email"
                          borderRadius="20px"
                          bg="#FAFAFA"
                          border="1px solid #E6E6E6"
                          h="45px"
                        />
                      </FormControl>
                    </GridItem>



                    <GridItem colSpan={2} p={1}>
                      <FormControl id="email">
                        <FormLabel fontFamily='Inter' fontWeight='600' fontSize="14px">
                          Kelompok
                        </FormLabel>
                        <Select placeholder='Pilih Kelompok'
                          borderRadius="20px"
                          bg="#FAFAFA"
                          border="1px solid #E6E6E6"
                          h="45px"
                          onChange={changeKelompok}
                        >
                          <option value='1'>Kelompok 1</option>
                          <option value='2'>Kelompok 2</option>
                          <option value='3'>Kelompok 3</option>
                          <option value='4'>Kelompok 4</option>
                          <option value='5'>Kelompok 5</option>
                          <option value='6'>Kelompok 6</option>
                          <option value='7'>Kelompok 7</option>
                          <option value='8'>Kelompok 8</option>
                          <option value='9'>Kelompok 9</option>
                          <option value='10'>Kelompok 10</option>
                          <option value='11'>Kelompok 11</option>
                          <option value='12'>Kelompok 12</option>
                          <option value='13'>Kelompok 13</option>
                          <option value='14'>Kelompok 14</option>
                          <option value='15'>Kelompok 15</option>
                          <option value='16'>Kelompok 16</option>
                          <option value='17'>Kelompok 17</option>
                          <option value='18'>Kelompok 18</option>
                          <option value='19'>Kelompok 19</option>
                          <option value='20'>Kelompok 20</option>
                          <option value='16'>Kelompok 16</option>
                          <option value='17'>Kelompok 17</option>
                          <option value='18'>Kelompok 18</option>
                          <option value='19'>Kelompok 19</option>
                          <option value='20'>Kelompok 20</option>
                          <option value='21'>Kelompok 21</option>
                          <option value='22'>Kelompok 22</option>
                          <option value='23'>Kelompok 23</option>
                          <option value='24'>Kelompok 24</option>
                          <option value='25'>Kelompok 25</option>
                        </Select>

                      </FormControl>
                    </GridItem>

                    <GridItem colSpan={2} p={1}>
                      <FormControl id="email">
                        <FormLabel fontFamily='Inter' fontWeight='600' fontSize="14px">
                          Urutan Anggota
                        </FormLabel>
                        <Select placeholder='Pilih Anggota'
                          borderRadius="20px"
                          bg="#FAFAFA"
                          border="1px solid #E6E6E6"
                          h="45px"
                          onChange={changeAnggota}
                        >
                          <option value='1'> 1</option>
                          <option value='2'> 2</option>
                          <option value='3'> 3</option>
                          <option value='4'> 4</option>
                          <option value='5'> 5</option>
                          <option value='6'> 6</option>
                        </Select>

                      </FormControl>
                    </GridItem>

                  </Grid>
                </Stack>

                <Stack spacing={10} align={"center"} mt="3">

                  <Button
                    onClick={handleSignUp}
                    bg={"#7ebd5a"}
                    color={"white"}
                    _hover={{
                      bg: "#5B5A68",
                    }}
                    fontFamily="Inter"
                    fontWeight="700"
                    fontSize="14px"
                    border="1px solid #C1C1C1"
                    borderRadius='25px'
                    width={[
                      "100%",
                      "80%",
                      "60%",
                      "40%",
                    ]}
                  >

                    Daftar

                  </Button>


                </Stack>


              </Box>
            </TabPanel>

          </TabPanels>
        </Tabs>


      </Stack>
    </Flex>
  );
}

export default Login;
