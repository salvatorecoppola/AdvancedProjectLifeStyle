import { getSummary, getCategories, getImages } from "./generate";

let okok = document.querySelector('#display-summary');
let ok2 = document.querySelector('#display');

let search = document.getElementById('search');
let foto = document.getElementById('immagine');

//in questo file js modificheremo il DOM e mandiamo a schermo le informazioni ricevute da generate.js
//la funzione getSummary per il sommario e getCategories per i dati delle categorie


//passiamo i dati per mandarli a schermo tramite una funzione asincrona
const displayInfo = async () => {

    const responseSummary = await getSummary(); 
    const displayCategories = await getCategories();
    const image = await getImages();
        
    // con la variabile "input" colleghiamo la nostra input bar (id="search") con il metodo "value" così da attivarla 
    // e poter leggere il contenuto al suo interno
    
    // la nostra chiamata all' API ritorna un array di oggetti,
    // quindi possiamo utilizzare il metodo .map per estrapolarne i dati
    // avvolto nella funzione dataDisplay troviamo
    // la funzione createDiv dove creiamo dinamicamente i paragrafi da appendere nel DOM 


    let dataDisplay = displayCategories?.map((object) => {
      
      const { color, name, score_out_of_10 } = object;
      
     return `<div id="display-data22">
     <div class="row">
       <div class="col">
       ${color}
       </div>
       <div class="col">
       ${name}
       </div>
       <div class="col">
       ${score_out_of_10}
       </div>
     </div>
   </div>`; 
    
}).join('');

// search.addEventListener('click', () => displayInfo(search.value))
okok.innerHTML = `${responseSummary}`;
ok2.innerHTML = `${dataDisplay}`;
foto.src = `${image}` ;
}

 
    displayInfo();

    
     
    let btn = document.getElementById("btn")
    btn.addEventListener("click", displayInfo)


//colleghiamo il bottone per la ricerca della input box 
//richiamando la funzione "displayInfo"

