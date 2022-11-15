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
  } from "@chakra-ui/react";
  import { supabase } from './supabase';
  import { useNavigate } from 'react-router-dom';
  
  export default function Layout() {
  
    const navigateTo = useNavigate();
    let navbarPosition = "fixed";
    let navbarBg = useColorModeValue(
      "linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%)",
      "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
    );
    let navbarBorder = useColorModeValue(
      "1.5px solid #FFFFFF",
      "1.5px solid rgba(255, 255, 255, 0.31)"
    );
    let navbarShadow = useColorModeValue(
      "0px 7px 8px rgba(0, 0, 0, 0.05)",
      "none"
    );
    let navbarFilter = useColorModeValue(
      "none",
      "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))"
    );
    let navbarBackdrop = "blur(21px)";
    let navbarIcon = useColorModeValue("gray.700", "gray.200");
    let variantChange = "0.2s linear";
  
    let purpleColor = "#6a5aa3";
    //active
    let activeBg = useColorModeValue("#B3A5DA", "gray.700");
    let activeColor = useColorModeValue("gray.700", "white");
    let sidebarActiveShadow = "0px 7px 11px rgba(0, 0, 0, 0.04)";
  
    //inactive
    let inactiveBg = useColorModeValue("white", "gray.700");
    let inactiveColor = useColorModeValue(purpleColor, "white");
    let sidebarInactiveShadow = "0px 0px 0px rgba(0, 0, 0, 0)";
    const textColor = useColorModeValue("gray.600", "white");
  
     const signOut = async () => {
     
      const { data, error } = await supabase.auth.signOut({
      })
      if (error) {
       
        console.log(error);
      } else {
        alert("Terimakasih");
        console.log(data);
        navigateTo("/");
      }
    };
  
    return (
  
      <ChakraProvider w="100%">
        <Flex flexDirection={'column'} w="100%">
          <Portal >
            <Flex
              position={navbarPosition}
              top="0px"
              left="50%"
              transform="translate(-50%, 0px)"
              background={'navbarBg'}
              boxShadow={navbarShadow}
              filter={navbarFilter}
              backdropFilter={navbarBackdrop}
              borderBottomRadius="4px"
              borderBottom="2px solid #d2d2d2"
              borderTop="none"
              mx="auto"
              py={5}
              width="100%"
              pr={{ sm: 4, lg: 8 }}
              pl={{ sm: 4, lg: 8 }}
              alignItems="center"
            >
              <HStack pl={4} display={{ sm: "none", lg: "flex" }} w={'100%'}>
                <Link to="/Dasboard">
                  <Button variant="transparent-with-icon" pt={1}>
                    Aplikasi Pemodelan
                  </Button>
                </Link>
              </HStack>
              <HStack display={{ sm: "none", lg: "flex" }}>
                <Link href="/Dasboard">
                  <Button variant="transparent-with-icon" >
                    Dashboard
                  </Button>
                </Link>
                <Link href="/InputData" >
                  <Button variant={'normal'}>
                    Input Data
                  </Button>
                </Link>
  
                
                  <Button variant={'normal'} onClick={signOut}>
                    Logout
                  </Button>
                
  
  
              </HStack>
            </Flex>
          </Portal>
        </Flex>
  
  
  
      </ChakraProvider >
  
    )
  
  }