import React, {Component} from "react";
import * as d3 from 'd3'

// Current Problems:
// Was unable to figure out how to display count on the bar chart using join within the time
// Was unable to figure out how to set the heights of bar charts to 65, 59, 76 without a Y-Axis (The image only has an X-Axis) within the time
// Was unable to figure out how to get a title on the bar chart within the time


// Child 1
// Create a bar chart in your Child1 component to visually represent the count of items across different categories.
// The height of each bar should correspond to the number of items in its respective category.
// Additionally, label each bar with the counts as shown in the screenshot below: 65, 59, and 76.

class Child1 extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  componentDidMount(){
    // console.log(this.props.data1);
  }
  componentDidUpdate(){
    // Categories
    // console.log("ComponentDidUpdate", this.props.data1);
    var data = this.props.data1;

    // Set the dimensions and margins of the graph
    var margin = { top: 10, right: 10, bottom: 30, left: 20 },
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;

    var container = d3
      .select(".child1_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .select(".g_1")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add X axis
    var x_data = data.map(item => item.category);
    var x_scale = d3
      .scaleBand()
      .domain(x_data)
      .range([margin.left, w])
      .padding(0.2);

    container
      .selectAll(".x_axis_g")
      .data([0])
      .join("g")
      .attr("class", "x_axis_g")
      .attr("transform", `translate(0, ${h})`)
      .call(d3.axisBottom(x_scale));

    var y_data = [65, 59, 76]
    const y_scale = d3.scaleLinear().domain([0,d3.max(y_data)]).range([h, 0]);
    // Create the bar chart

    container
      .selectAll("rect")
      .data(x_data)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x_scale(d[0]);
      })
      .attr("y", function (d) {
        return y_scale(d[1]);
      })
      .attr("width", x_scale.bandwidth())
      .attr("height", function (d) {
        return h;
      })
      .attr("fill", "#69b3a2");
  }
  render(){
    return <svg className="child1_svg">
        <g className="g_1"></g>
    </svg>
  }
}

export default Child1;