import axios from "axios"

const apiUrl = process.env.API_KEY

async function getSummary(){
  try {
    const response = await axios.get(`${apiUrl}`+`${search.value}/scores/`);
    return response.data.summary
  } catch (err) {function errorHendling(){
  if (search.value === ""){ document.getElementById('errorMessage').innerHTML =
  `<div class="alert alert-danger" role="alert"> Type Los Angeles </div>` + (err)
}};
}};
getSummary()

async function getImages(){
  try {
    const response = await axios.get(`${apiUrl}`+`${search.value}/images/`);
    return response.data.photos[0].image.web;
  } catch (err) {function errorHendling(){
  if (search.value === ""){ document.getElementById('errorMessage').innerHTML =
  `<div class="alert alert-danger" role="alert"> Type Los Angeles </div>` + (err)
}};
}};
getImages()

async function getCategories() {
  try {
    const response = await axios.get(`${apiUrl}`+`${search.value}/scores/`);
    return response.data.categories 
    
  
  } catch (err) {function errorHendling(){
    if (search.value === ""){ document.getElementById('errorMessage').innerHTML =
  `<div class="alert alert-danger" role="alert">
  Type Los Angeles
  </div>` + (err)}};

  } 
  
}
getCategories()

export { getSummary, getCategories, getImages}
        