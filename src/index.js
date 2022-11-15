import React from 'react'
import ReactDOM from 'react-dom/client'
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import App from './App'
import Dashboard from './Dashboard'
import InputData from './InputData'
import TambahDataMin from './TambahDataMin'
import TambahDataMax from './TambahDataMax'
import Grafik from './Grafik'

import { ChakraProvider } from '@chakra-ui/react'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/InputData" element={<InputData />} />
        <Route path="/TambahDataMin" element={<TambahDataMin />} />
        <Route path="/TambahDataMax" element={<TambahDataMax />} />
        <Route path="/Grafik" element={<Grafik />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
