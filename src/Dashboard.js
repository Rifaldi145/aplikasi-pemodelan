import React, { useState, useEffect } from 'react';
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

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import Layout from './components/Layout';

import ChartDataLabels from "chartjs-plugin-datalabels";
import Zoom from "chartjs-plugin-zoom";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler,
    PointElement,
    LineElement
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

import { supabase } from './components/supabase';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartDataLabels,
  Filler,
  PointElement,
  LineElement,
  Zoom
);

const Dashboard = () => {
  const navigateTo = useNavigate();
  const [dataChartMax, setDataChartMax] = useState({
    labels: [],
    datasets: []
  });

  const [dataChartMin, setDataChartMin] = useState({
    labels: [],
    datasets: []
  });
  
  useEffect(() => {
    getDataMinMax();
  }, []);

  const getDataMinMax = async () => {
    const user = await supabase.auth.getUser();
    if (!user) {
      navigateTo("/");
    }

    let exam_max = await supabase
    .from('exam_maximizes')
    .select('anggota, result_obj, result_x1, result_x2, result_x3')
    .order('anggota', {
      ascending: true}
    )
    .eq('kelompok', user.data.user.user_metadata.kelompok)
    .eq('grafik', 1);

    var labelMax = [];
    // var arrMaxObj = [];
    var arrMaxX1 = [];
    var arrMaxX2 = [];
    var arrMaxX3 = [];

    exam_max.data.map(function(rows, i) {
      labelMax.push(`Anggota ${rows.anggota}`);

      // arrMaxObj.push(rows.result_obj)
      arrMaxX1.push(rows.result_x1)
      arrMaxX2.push(rows.result_x2)
      arrMaxX3.push(rows.result_x3)
    });

    setDataChartMax({
      labels: labelMax,
      datasets: [
        // {
        //   label: "Obj",
        //   data: arrMaxObj,
        //   fill: true,
        //   borderColor: "#f4722b"
        // },
        {
          label: "X1",
          data: arrMaxX1,
          fill: false,
          borderColor: "#742774"
        },
        {
          label: "X2",
          data: arrMaxX2,
          fill: false,
          borderColor: "#0000ff"
        },
        {
          label: "X3",
          data: arrMaxX3,
          fill: false,
          borderColor: "#b6c0b3"
        }
      ]
    });

    
    
    let exam_min = await supabase
    .from('exam_minimizes')
    .select('anggota, result_obj, result_x1, result_x2, result_x3')
    .order('anggota', {
      ascending: true}
    )
    .eq('kelompok', user.data.user.user_metadata.kelompok)
    .eq('grafik', 1);

    var labelMin = [];
    // var arrMinObj = [];
    var arrMinX1 = [];
    var arrMinX2 = [];
    var arrMinX3 = [];

    exam_min.data.map(function(rows, i) {
      labelMin.push(`Anggota ${rows.anggota}`);

      // arrMinObj.push(rows.result_obj)
      arrMinX1.push(rows.result_x1)
      arrMinX2.push(rows.result_x2)
      arrMinX3.push(rows.result_x3)
    });

    setDataChartMin({
      labels: labelMin,
      datasets: [
        // {
        //   label: "Obj",
        //   data: arrMinObj,
        //   fill: true,
        //   borderColor: "#f4722b"
        // },
        {
          label: "X1",
          data: arrMinX1,
          fill: false,
          borderColor: "#742774"
        },
        {
          label: "X2",
          data: arrMinX2,
          fill: false,
          borderColor: "#0000ff"
        },
        {
          label: "X3",
          data: arrMinX3,
          fill: false,
          borderColor: "#b6c0b3"
        }
      ]
    });
  };

  return (
    <Box>
      <Layout />
      <Box mt="85px" bg="#f6f6f6" p="5" >
        <Text ml="10" color="#000">Dashboard</Text>
      </Box>
      <SimpleGrid columns={{ sm: 1, lg: 2 }} mt="-10" spacing={5} p="20">
        <Box border="2px solid #f7f7f7" p="5" borderRadius="5px">
          <Text align="center"> Grafik Maximize</Text>
          <div id="chartdiv" style={{ width: "100%", height: "500px" }}>
            <Line
              data={dataChartMax}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  zoom: {
                    pan: { enabled: true, mode: "x", threshold: 10 },
                    zoom: {
                      mode: "x",
                      drag: {
                        enabled: true,
                        backgroundColor: "rgba(225,0,225,0.3)",
                      },
                      wheel: {
                        enabled: true,
                        modifierKey: "alt",
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </Box>

          <Box border="2px solid #f7f7f7" p="5" borderRadius="5px">
          <Text align="center">Grafik Minimize</Text>
          <div id="chartdiv" style={{ width: "100%", height: "500px" }}>
            <Line
              data={dataChartMin}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  zoom: {
                    pan: { enabled: true, mode: "x", threshold: 10 },
                    zoom: {
                      mode: "x",
                      drag: {
                        enabled: true,
                        backgroundColor: "rgba(225,0,225,0.3)",
                      },
                      wheel: {
                        enabled: true,
                        modifierKey: "alt",
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </Box>

      </SimpleGrid>

    </Box>
  )

}
export default Dashboard;