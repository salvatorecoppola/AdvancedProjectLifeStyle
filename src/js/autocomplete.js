import axios from "axios"

const apiUrbanAreas = process.env.API_AUTOCOMPLETE

//select the search bar and add the keyup event
//and the autoComplete function will be used for the autocompletion of the cities
const input = document.getElementById("searchBar");
input.addEventListener("keyup", autocomplete)


/* I declare an empty array where I will insert all the cities
obtained by calling axios to Teleport
via the getUrbanAreas function */
let arrayCity = []


/* getUrbanAreas returns me an object where I'm going to extrapolate
an array of objects()
From this array I apply a map() and get the property 'name'
This way I transform 'arrayCity' into an array containing
the complete list of cities in Teleport
arrayCity will serve me in autocomplete and autoCompleteMatch' */
const getUrbanAreas = async () =>  {
  try {
 
    const response = await axios.get( apiUrbanAreas );
    arrayCity = response.data["_links"]["ua:item"]; //Array of objects
    arrayCity = arrayCity.map((city) => city.name); //list of all cities in array

  } catch (error) {
    console.log(error);
  } 
};
getUrbanAreas();




const finalResult = document.getElementById("autoCompleteResult");


/* in this function I take the value from autocomplete
through a RegExp I declare that: if the value of the searchBar
is empty, returns empty array, on the contrary the inserted word will have to
have the match with the city previously taken from arrayCity */
function autocompleteMatch(value){
  if (value == "") return []
  const reg = new RegExp( `^${value}`,'gi')
  return arrayCity.filter( city => { 
    if(city.match(reg)) return city
  })
}


/* in autoComplete returns the "event" value from the "keyup" event
from the input variable, these in turn via event.target.value
are passed as "value" to autocompleteMatch
From autocompleteMatch returns the filtered element "city" (the name of the city) */
function autocomplete(event){
  let autocompleteResult = ""
  const cityMatches = autocompleteMatch(event.target.value)

  cityMatches.forEach(city =>  {
    

/* therefore, in the cityMatches variable returns the filtered element "city",
     from here we start our formatting in HTML,
     we initialize the autocomplteResult variable,
     will be hung in the DOM in the finalResult div in which via backtick
     we will pass the "city" element as the final result */
    autocompleteResult += `<li>${city = city.toLowerCase()}</li>`

    /*inoltre finalResult al suo click farà partire la funzione selectResult */
    finalResult.addEventListener("click", selectResult)

  })
  finalResult.innerHTML = `<ul id="ulCityList">${autocompleteResult}</ul>`

}


/*selectResult will make sure that when we click on the
recommended city this will hang in our input and
ready to be searched and empty the finalResult div */
function selectResult(event){

 
  finalResult.innerHTML = ""
  input.value =  event.target.textContent.replace(/ /g,'-');
  

}


