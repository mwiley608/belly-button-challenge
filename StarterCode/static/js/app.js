// STEP 1 Use D3 library to read in samples.json from URL
// Get the samples endpoint - url
const samples = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(samples).then((data) => {
  console.log(data);
});


//STEP 2 Create horizontal bar chart(sample_values = values, otu_ids = labels, otu_labels = hovertext), dropdown menu of top 10 OTUs
// READ ME https://plotly.com/javascript/bar-charts/ 
function barChart(sample) {
  //d3.json(samples).then((data) => {

    //Activity 14.2.8 - Slice
    //.map create hovertext
    let yticks = sample.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
    let xticks = sample.sample_values.slice(0, 10).reverse();
    let barLabels = sample.otu_labels.slice(0, 10).reverse();
    console.log(yticks, xticks, labels);

  //Trace for Bar Chart
  let traceBar = {
      x: xticks,
      y: yticks,
      text: barLabels,
      type: 'bar',
      orientation: 'h'
    };

    //Layout for BarChart
    let layoutBar = {
      title: 'Top 10 OTUs'
    };
  
    //Plot Bar Chart with Plotly
    Plotly.newPlot('bar', traceBar, layoutBar);
};

//STEP 3 Create bubble chart displaying each sample
//otu_ids = x, sample_values = y, sample_values = marker size, otu_ids = marker colors, otu_labels = text values
//READ ME https://plotly.com/javascript/bubble-charts/
function bubbleChart(sample) {
  let otu_ids = sample.otu_ids;
  let otu_labels = sample.otu_labels;
  let sample_values = sample.sample_values;
  console.log(otu_ids, otu_labels, sample_values);

  //Trace for Bubble Chart
  let traceBubble = {
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: 'markers',
    marker: {
      color: otu_ids,
      size: sample_values
    }
  };
  
 //Layout for Bubble Chart
  
  let layoutBubble = {
    title: 'Bubble Chart Hover Text',
    showlegend: false,
    height: 600,
    width: 600
  };

  //Plot Bubble Chart with Plotly
  Plotly.newPlot('bubble', traceBubble, layoutBubble);
}

//STEP 4 Display sample metadata (demographic info)
function populateMetadata(sample) {
  d3.json(samples).then((data) => {
    let metadata = data.metadata;
  }
},

//STEP 5 Display key-value pair from metadata JSON object
//STEP 6 Update plots when new sample selected
//STEP 7 Display app to hosting service


//Class Activity 14.3.10
// Initilize dropdown menu for dashboard


// Class Activity start
// Initializes the page with a default plot
function init() {
    data = [{
      x: [1, 2, 3, 4, 5],
      y: [1, 2, 4, 8, 16] }];
  
    Plotly.newPlot("plot", data);
  }
  
  // Call updatePlotly() when a change takes place to the DOM
  d3.selectAll("#selDataset").on("change", updatePlotly);
  
  // This function is called when a dropdown menu item is selected
  function updatePlotly() {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    let dataset = dropdownMenu.property("value");
  
    // Initialize x and y arrays
    let x = [];
    let y = [];
  
    if (dataset === 'dataset1') {
      x = [1, 2, 3, 4, 5];
      y = [1, 2, 4, 8, 16];
    }
  
    else if (dataset === 'dataset2') {
      x = [10, 20, 30, 40, 50];
      y = [1, 10, 100, 1000, 10000];
    }
  
    // Note the extra brackets around 'x' and 'y'
    Plotly.restyle("plot", "x", [x]);
    Plotly.restyle("plot", "y", [y]);
  }
  
  init();
  // Class activity end