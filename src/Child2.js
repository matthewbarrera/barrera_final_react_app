import React, {Component} from "react";
import * as d3 from 'd3'

// Current Problems:
// Was unable to figure out how to get an interactive component using join within the time
// Was unable to figure out how to get different points to plot (Mostly due to a lack of a component) within the time
// Was unable to figure out how to get a tooltip within the time
// Console.log shows that X and Y are found, but it's not graphing the points for some reason; Was unable to fix this within the time


// Child 2
// Create a scatterplot in your Child2 component to illustrate the correlation between x and y values across different categories.
// Initially, set category A as the default for the scatterplot.
// Include a dropdown menu with hardcoded category options to allow users to switch between different categories, which will...
// dynamically update the scatterplot.
// Integrate tooltips into the scatterplot that display the x and y values of the data points when the user hovers over them.

class Child2 extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  componentDidMount(){
    // console.log(this.props.data2);
  }
  componentDidUpdate(){
    // X vs Y
    // console.log("ComponentDidUpdate", this.props.data2);
    var data = this.props.data2

    // Set the dimensions and margins of the graph
    var margin = { top: 10, right: 10, bottom: 30, left: 20 },
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;

    var container = d3.select(".child2_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .select(".g_1")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add X axis
    var x_data = data.map(item => item.x)
    console.log(x_data); // For testing
    const x_scale = d3.scaleLinear().domain([0,d3.max(x_data)]).range([margin.left, w]);
    container
      .selectAll(".x_axis_g")
      .data([0])
      .join("g")
      .attr("class", "x_axis_g")
      .attr("transform", `translate(0, ${h})`)
      .call(d3.axisBottom(x_scale));

    // Add Y axis
    var y_data = data.map(item => item.y)
    console.log(y_data); // For testing
    const y_scale = d3.scaleLinear().domain([0,d3.max(y_data)]).range([h, 0]);
    container
      .selectAll(".y_axis_g")
      .data([0])
      .join("g")
      .attr("class", "y_axis_g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y_scale));

    container
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", function (d) {
        return x_scale(d.x);
      })
      .attr("cy", function (d) {
        return y_scale(d.y);
      })
      .attr("r", 3)
      .style("fill", "#69b3a2");
  }
  render(){
    return <svg className="child2_svg">
        <g className = "g_2"></g>
    </svg>
  }
}

export default Child2;