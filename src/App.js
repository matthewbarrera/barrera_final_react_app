import React, { Component } from 'react';

import "./App.css"
import Child1 from "./Child1";
import Child2 from "./Child2";
import * as d3 from 'd3'
import sample_data from './SampleDataset.csv'

// The SampleDataset contains 200 data points spread across three columns: x, y, and category.
// Here's a breakdown of each column:
//     x and y: Positive integer values, representing some measure or dimension.
//     category: Categorical column with three possible values: 'A', 'B', or 'C'. These labels are randomly assigned to each data point.

// Develop a dashboard that replicates the application demonstrated in the following cell.
// The dashboard should consist of three main components: App, Child 1, and Child 2.

// 1.) Within the App component, load the specified CSV file to establish the overall layout of the dashboard...
// 2.) Then distribute the data to both Child 1 and Child 2 components for further processing and display.
// Detailed descriptions of the child components are provided in the subsequent cells.



// Important: Please refrain from using the enter-append technique. Instead, opt for the join technique.

// Child 1
// Create a bar chart in your Child1 component to visually represent the count of items across different categories.
// The height of each bar should correspond to the number of items in its respective category.
// Additionally, label each bar with the counts as shown in the screenshot below: 65, 59, and 76.

// Child 2
// Create a scatterplot in your Child2 component to illustrate the correlation between x and y values across different categories.
// Initially, set category A as the default for the scatterplot.
// Include a dropdown menu with hardcoded category options to allow users to switch between different categories, which will...
// dynamically update the scatterplot.
// Integrate tooltips into the scatterplot that display the x and y values of the data points when the user hovers over them.

class App extends Component {
  constructor(props){
    super(props);
    this.state = {data:[]};
  }
  componentDidMount(){
    var self=this
    d3.csv(sample_data, function(d){
      return {
        x:parseInt(d.x),
        y:parseInt(d.y),
        category:d.category
      }
    }).then(function(csv_data) {
      self.setState({data:csv_data})
      console.log(csv_data)
    })
    .catch(function(err){
      console.log(err)
    })
  }
  render(){
    return <div className="parent">
      <div className="child1"><Child1 data1={this.state.data}></Child1></div>
      <div className="child2"><Child2 data2={this.state.data}></Child2></div>
    </div>
  }
}

export default App;