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

class Dashboard extends Component {
  componentDidMount() {

    let root = am5.Root.new("chartdiv");

    let chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,
  panY: true,
  wheelX: "panX",
  wheelY: "zoomX",
  pinchZoomX:true
}));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
let xRenderer = am5xy.AxisRendererX.new(root, {});
xRenderer.grid.template.set("forceHidden", true);
xRenderer.labels.template.setAll({multiLocation: 0, location:0});

let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  baseInterval: { timeUnit: "minute", count: 30 },
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {}),
  extraMin: 0.01,
  extraMax: 0.01,
  tooltipLocation: 0
}));

let yRenderer = am5xy.AxisRendererY.new(root, {});
yRenderer.grid.template.set("forceHidden", true);

let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: yRenderer
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "none",
  xAxis: xAxis
}));
cursor.lineY.set("visible", false);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
let series = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Series",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  valueXField: "category",
  locationX: 0,
  seriesTooltipTarget: "bullet",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY}"
  })
}));

series.bullets.push(function() {
  let circleTemplate = am5.Template.new({
    radius: 6,
    templateField: "bulletSettings",
    fill: series.get("fill"),
    strokeWidth: 2,
    stroke: root.interfaceColors.get("background")
  })

  let circle = am5.Circle.new(root, {}, circleTemplate);

  return am5.Bullet.new(root, {
    sprite: circle,
    locationX: 0
  });
});

function createGuide(value, text, dashArray) {
  let guideDataItem = yAxis.makeDataItem({ value: value });
  yAxis.createAxisRange(guideDataItem);
  guideDataItem.get("grid").setAll({
    forceHidden: false,
    strokeOpacity: 0.2,
    strokeDasharray: dashArray
  });

  let label = guideDataItem.get("label");
  label.setAll({
    text: text,
    isMeasured: false,
    centerY: am5.p100
  });

  label.adapters.add("x", function(x) {
    return chart.plotContainer.width();
  })
  
  chart.events.on("boundschanged", function(){
    label.set("x", label.get("x"))
  })  
}


createGuide(98.8, "LCL", [2, 2]);
createGuide(100.1, "CL");
createGuide(101.2, "UCL", [2, 2]);


let data = [{
  "category": new Date(2020, 0, 1, 22, 30).getTime(),
  "value": 99.71
}, {
  "category": new Date(2020, 0, 1, 23, 0).getTime(),
  "value": 99.13
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
          <Text ml="10" color="#000">Dashboard</Text>
        </Box>
        <SimpleGrid columns={{ sm: 1, lg: 2 }} mt="-10" spacing={5} p="20">
          <Box border="2px solid #f7f7f7" p="5" borderRadius="5px">
            <Text align="center"> Grafik Maximize</Text>
            <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
          </Box>

           <Box border="2px solid #f7f7f7" p="5" borderRadius="5px">
            <Text align="center">Grafik Minimize</Text>
            <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
          </Box>

        </SimpleGrid>

      </Box>

    );
  }
}

export default Dashboard;