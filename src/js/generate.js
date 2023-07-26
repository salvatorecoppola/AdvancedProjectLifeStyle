import axios from "axios"
import '../styles/main.scss'


const apiUrl = process.env.API_URL


const input = document.getElementById("searchBar");
const summary = document.getElementById('display-summary');
const pictures = document.getElementById('display-image');
const salaries = document.getElementById("display-salaries");
const accordion = document.getElementById("accortion");
const table = document.getElementById("display");
const finalResult = document.getElementById("autoCompleteResult");
const errorElement = document.getElementById('ErrorBoxContainer');

/* by declaring "Input" I get
the value of the searchbox and to attach it to the link of
Teleport in order to be able to receive the data of the entered cities 


/* extract data from the API for each argument by making a return.
By exporting the functions I can then use them in mappingdata.js
using object deconstruction using .map


Functions and their calls and all related functions
(even HTML formatting) will always follow this order


1)Summary
2)Categories
3)Pictures
4)LgbtqInformation
5)Salaries
6)Pollution
7)Living
8)Education

*/


// Function to handle API call errors
function errorHandling(err){
  if( !input || err.response.status == 404 ){  
    errorElement.innerHTML = `<div class="alert alert-warning" role="alert">
    "Must write a city in Searchbox"!
  </div>`
    input.addEventListener("focus", deleteAll)
    function deleteAll(){
      table.innerHTML=""
      summary.innerHTML=""
      salaries.innerHTML = ""
      accordion.innerHTML = ""
      finalResult.innerHTML = ""
      errorElement.innerHTML = ""

    }
  } 
};


async function getSummary() {
  try {  
    const response = await axios.get(`${apiUrl}${input.value}/scores/`)
    
    const summaryData = response.data.summary;
    return summaryData;
    
  } catch (err) {errorHandling(err)}
};
getSummary;


async function getCategories() {
  try {
    const response = await axios.get(`${apiUrl}`+`${input.value}/scores/`);
    
    const categoriesData = response.data.categories
    return categoriesData 
   
      
  } catch (err) {errorHandling(err)}
};
getCategories;


async function getImages(){
  try {

    const response = await axios.get(`${apiUrl}`+`${input.value}/images/`);
    
   const imageUrl = response.data.photos[0].image.web;
   return imageUrl

  } catch (err){errorHandling(err)}
};
getImages


async function getLgbtqInformation(){
  try {
    const response = await axios.get(`${apiUrl}`+`${input.value}/details/`);
    
    const lgbtqData = response.data.categories["12"].data
    return lgbtqData

  } catch (err){errorHandling(err)}
};
getLgbtqInformation


async function getSalaries(){
  try {
    const response = await axios.get(`${apiUrl}`+`${input.value}/salaries/`);

    const salariesData = response.data.salaries;
    return salariesData

  } catch (err){errorHandling(err)}
};
getSalaries


async function getPollutionInformation(){
  try {
    const response = await axios.get(`${apiUrl}`+`${input.value}/details/`);

    const pollutionData = response.data.categories["15"].data
    return pollutionData

  } catch (err){errorHandling(err)}
};
getPollutionInformation


async function getLivingInformation(){
  try {
    const response = await axios.get(`${apiUrl}`+`${input.value}/details/`);
   
    const livingData = response.data.categories["3"].data
    return livingData

  } catch (err){errorHandling(err)}
};
getLivingInformation


async function getEducationInformation(){
  try {
    const response = await axios.get(`${apiUrl}`+`${input.value}/details/`);
    
    const educationData = response.data.categories["6"].data
    return educationData
    
  } catch (err){errorHandling(err)}
};
getEducationInformation



export { getSummary, getCategories, getImages, getLgbtqInformation, getSalaries, getPollutionInformation, 
  getLivingInformation, getEducationInformation }
        
