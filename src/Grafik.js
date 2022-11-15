import React, { Component } from 'react';
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

import Layout from './components/Layout'

class Grafik extends Component {
  componentDidMount() {

    let root = am5.Root.new("chartdiv");

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true
    }));

    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
      rotation: -90,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 15
    });

    // Create Y-axis
    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      maxDeviation: 0.3,
      categoryField: "bulans",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {})
    }));

    // Create X-Axis
    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0.3,
      renderer: am5xy.AxisRendererY.new(root, {})
    }));



    // Create series
    let series = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: "Series 1",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      categoryField: "category",
      sequencedInterpolation: true,
      categoryXField: "bulans",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{category}{valueY}"
      })
    }));



    series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });
    series.columns.template.adapters.add("fill", function(fill, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.columns.template.adapters.add("stroke", function(stroke, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });


    // Set data
    let data = [{
      bulans: "Januari",
      category: "Produk:",
      value: 2025
    }, {
      bulans: "Febuari",
      category: "Produk:",
      value: 1882
    }, {
      bulans: "Maret",
      category: "Produk:",
      value: 1809
    }, {
      bulans: "April",
      category: "Produk:",
      value: 1322
    }, {
      bulans: "Mei",
      category: "Produk:",
      value: 1122
    }, {
      bulans: "Juni",
      category: "Produk:",
      value: 1114
    }, {
      bulans: "Juli",
      category: "Produk:",
      value: 984
    }, {
      bulans: "Agustust",
      category: "Produk:",
      value: 711
    }, {
      bulans: "September",
      category: "Produk:",
      value: 665
    }, {
      bulans: "Oktober",
      category: "Produk:",
      value: 443
    }, {
      bulans: "November",
      category: "Produk:",
      value: 441
    }, {
      bulans: "Desember",
      category: "Produk:",
      value: 700
    }];

    xAxis.data.setAll(data);
    series.data.setAll(data);

    // Add legend

    this.root = root;
  }

  componentWillUnmount() {
    if (this.root) {
      this.root.dispose();
    }
  }

  render() {
    return (
      <Box>
        <Layout />
            <Box mt="85px" bg="#f6f6f6" p="5" >
              <Text ml="10" color="#000">Dashboard Grafik</Text>
            </Box>
            
            <SimpleGrid columns={{ sm: 1, lg: 2 }} mt="-10" spacing={5} p="20">
              <Box border="2px solid #f7f7f7" p="5" borderRadius="5px">
                <Text align="center">Diagram Batang Penjualan Produk</Text>
                    <div id="chartdiv" style={{ width: "100%", height: "500px" }}>                  </div>
              </Box>
            </SimpleGrid>

      </Box>

    );
  }
}

export default Grafik;