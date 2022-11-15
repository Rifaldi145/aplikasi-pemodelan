import { useRef, useState,useEffect  } from 'react'

import { supabase } from './components/supabase';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import Login from './Login'
import Dashboard from './Dashboard'
import InputData from './InputData'
import TambahDataMin from './TambahDataMin'
import TambahDataMax from './TambahDataMax'
import Grafik from './Grafik'

import { ChakraProvider } from '@chakra-ui/react'



const App = () => {

  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  
  return (
    <ChakraProvider>
      <BrowserRouter>
      {!session ?  
            <Routes>
              <Route path="/" element={<Login />} />
            </Routes> 
        : 
      
          <Routes key={session.user.id}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/InputData" element={<InputData />} />
            <Route path="/TambahDataMin" element={<TambahDataMin />} />
            <Route path="/TambahDataMax" element={<TambahDataMax />} />
            <Route path="/Grafik" element={<Grafik />} />
          </Routes>
        }
       
      </BrowserRouter>
  </ChakraProvider>
  );
}

export default App;
