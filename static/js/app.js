// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");

function buildTable(data) {
    // First, clear out any existing data
    tbody.html("");
  
    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
      // Append a row to the table body
      let row = tbody.append("tr");
  
      // Loop through each field in the dataRow and add
      // each value as a table cell (td)
      Object.values(dataRow).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
        }
      );
    });
}

// Keep track of all filters
var filters = {};

function updateFilters() {

  // Save the element, value, and id of the filter that was changed
  let event = d3.event.target
  let filterChanged = {id: event.id, value: event.value, element: event}


  // If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object
  if (filterChanged.value !== "") filters[filterChanged.id] = filterChanged.value;
  else delete filters[filterChanged.id]
  
  // Call function to apply all filters and rebuild the table
  filterTable();
}


function filterTable() {

  // Set the filteredData to the tableData
  let filteredData = tableData;

  // // Loop through all of the filters and keep any data that
  // // matches the filter values
  Object.keys(filters).forEach(function(key) {
    filteredData = filteredData.filter(row => row[key] === filters[key]);
  });

  // Finally, rebuild the table using the filtered Data
  buildTable(filteredData);
}

function clearFilters() {

  // For each filter that has had entries, clear the entry  
  Object.keys(filters).forEach(function(key) {
    document.getElementById(key).value = "";
  });

  // Clear Filter List
  filters = {}

  // Rerun the filters table function so the table will reset
  filterTable()

}

// Attach an event to listen for changes to each filter
// Hint: You'll need to select the event and what it is listening for within each set of parenthesis
d3.selectAll("input").on("change", updateFilters);

d3.select("#filter-btn").on("click", clearFilters)

// Build the table when the page loads
buildTable(tableData);
