/*In this js file we will modify the DOM and we will
display the information received from generate.js
the final results of the variables will 
be appended to the bottom of this file*/
import Chart from 'chart.js/auto'


import {getSummary, getCategories, getImages, getLgbtqInformation, getSalaries, getPollutionInformation, 
getLivingInformation, getEducationInformation} from "../js/generate";



const summary = document.getElementById('display-summary');
const pictures = document.getElementById('display-image');
const salaries = document.getElementById("display-salaries");
const accordion = document.getElementById("accortion");
const table = document.getElementById("display");


/* The following function displayInfo
contains all handling for responses
received from the API, it will act as a container and will be executed
when clicking on the searchbox button */
// Funzione per gestire gli errori delle chiamate API

const displayInfo = async () => {
  
/* Here I manage data from API responses, export here
the functions from "generated" and via the .map method
I deconstruct the objects and send them
on screen with backtick after returning */

/* Every deconstruction finds its place
under his function,
where there isn't means it didn't have
need to be deconstructed */

const responseSummary = await getSummary();
summary.innerHTML = responseSummary;

/* Here I declare an Immediately Invoked Function Expression
to use a BarChart via ChartJs and this graph is already hung in html */
(async function () {

  /* Retrieve the data for the categories */
  const data = await getCategories();

  // Retrieving the canvas element
  const canvas = document.getElementById('myChart');
 

  // Check if the canvas element already has an associated graphic
  const hasChart = canvas.getAttribute('data-has-chart') === 'true';


  // If a chart is already attached to the canvas, destroy it
  if (hasChart) {
    Chart.getChart(canvas).destroy();
  }

  // Create the new chart
  const chart = new Chart(canvas, {
    type: 'bar',
    options:{
      responsive: true
    },
    data: {
      labels: data.map(x => x.name),
      datasets: [
        {
          label: 'Score',
          data: data.map(row => row.score_out_of_10),
          backgroundColor: data.map(color => color.color)
        }
      ]
    }
  });

  // I set the custom attribute to indicate that the canvas has an associated graphic
  canvas.setAttribute('data-has-chart', 'true');

  // Function to update the graph with new data
  async function updateChart() {
    const updatedData = await getCategories();
    chart.data.labels = updatedData.map(x => x.name);
    chart.data.datasets[0].data = updatedData.map(row => row.score_out_of_10);
    chart.update();
  }
  // Call to the graph update function
  await updateChart();

})();


const image = await getImages();
pictures.src = image; // Update the src attribute of the image element with the URL obtained
pictures.style.display = 'inline'; //Show the previously hidden image element in CSS



const LgbtqInformation = await getLgbtqInformation();
let displayDataLgbtq = LgbtqInformation?.map((object) => {
const { label, string_value, float_value, percent_value} = object;
// Mathround rounds the number
// With this operation I translate simple values ​​into percentages
const percentValueNum = float_value;
const finalPercentValue = Number(percentValueNum/100).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2});

 return `<div id="displayDataLgbtq">
 <div class="row">
   <div class="col">
   ${label}
   </div>
   <div class="col">
   ${string_value||percent_value||finalPercentValue}
   </div>
 </div>
</div>`}).join('');


const dataSalaries = await getSalaries(); 
let displayDataSalaries = dataSalaries.map((object) => {      
  const { job, salary_percentiles } = object;
// With this operation we transform the integer
// To a decimal number by converting it into salary
  const salariesPercentile = salary_percentiles.percentile_50
  const salariesNum = new Intl.NumberFormat('en-IN', { style: 'currency',currency: 'USD', currencyDisplay: 'narrowSymbol' }).format(salariesPercentile);
return `
      <td> ${job.title}</td>
      <td> ${salariesNum}</td>
    </tr>` 

}).join('');

  /* Here we append the results in HTML */
const tableDiv = document.createElement("div");
table.innerHTML = ""
table.append(tableDiv);
tableDiv.innerHTML= `
<div id="displayDataSalaries" data-aos="fade-right"
data-aos-offset="300">
 <table class="table text-start">
  <thead>
    <tr>
      <th scope="col">Job</th>
      <th scope="col">Salaries</th>
    </tr>
  </thead>
  <tbody>
  ${displayDataSalaries}
    </tbody>
    </table>`;



const pollutionInformation = await getPollutionInformation();
let displayDataPollution = pollutionInformation?.map((object) => {
  
  const { label, float_value, int_value} = object;
 // With toFixed I shorten the value to two(2) numbers
   return `<div id="displayDataPollution">
   <div class="row">
     <div class="col">
     ${label}
     </div>
     <div class="col">
     ${int_value||float_value?.toFixed(2)}
     </div>
   </div>
  </div>`; 
   
  }).join('');


const livingInfo = await getLivingInformation();
let displayDataLiving = livingInfo?.map((object) => {
  
  const { label, currency_dollar_value, float_value } = object;
  //with this operation we transform a simple number
  //in decimal number (prices)
  const currencyDollar = currency_dollar_value
  const costOfLiving = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol' }).format(currencyDollar)
    
   return `<div id="displayDataLiving">
   <div class="row">
     <div class="col">
     ${label}
     </div>
     <div class="col">
     ${float_value||costOfLiving}
     </div>
   </div>
  </div>`; 


  }).join('');


const educationInfo = await getEducationInformation();
let displayDataEducation = educationInfo?.map((object) => {
const { label, percent_value, float_value, int_value, string_value } = object;
//with this operation I translate simple values ​​into percentages
const percentValueNum = percent_value;
const finalPercentValue = Number(percentValueNum/100).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2}); 
//with this operation I shorten the value to two numbers
const fixedFloatValue = float_value?.toFixed(2)
    
   return `<div id="displayDataEducation">
   <div class="row">
     <div class="col">
     ${label}
     </div>
     <div class="col">
     ${fixedFloatValue||int_value||string_value||finalPercentValue}
     </div>
   </div>
  </div>`; 
  
  }).join('');

  /* Here we append the results in HTML */
const div = document.createElement("div");
accordion.innerHTML = ""
accordion.append(div);
accordion.innerHTML = 
`<div class="accordion accordion-flush" data-aos="fade-left" id="accordionFlushExample">
<div class="accordion-item">
  <h2 class="accordion-header">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
      Data #1
    </button>
  </h2>
  <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
    <div class="accordion-body">  ${displayDataLgbtq}
  </div>
</div>
<div class="accordion-item">
  <h2 class="accordion-header">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
    Data #2
    </button>
  </h2>
  <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
    <div class="accordion-body"> ${displayDataPollution}
  </div>
</div>
<div class="accordion-item">
  <h2 class="accordion-header">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
    Data #3
    </button>
  </h2>
  <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
    <div class="accordion-body">${displayDataLiving}
  </div>
</div>
<div class="accordion-item">
  <h2 class="accordion-header">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
    Data #4
    </button>
  </h2>
  <div id="flush-collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
    <div class="accordion-body">${displayDataEducation}
  </div>
</div>
</div>
</div>
</div>`;
};// End of diplayInfo function


 /* Below I connect the searchBar button
  to which I connected the click event and the function
  displayInfo which will show all recalled data*/
  let searchBtn = document.getElementById("searchBtn")
  searchBtn.addEventListener("click", displayInfo);


  
