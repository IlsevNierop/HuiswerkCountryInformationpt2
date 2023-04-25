import axios from "axios";

const inputField = document.getElementById("input-field");
const submitForm = document.getElementById("submit-form");


submitForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(inputField.value);
    //hier straks de fetch functie aanroepen
    inputField.value = "";
})
//countryQuery
//?fields=flag,name,population,region
async function fetchCountries(){
    try{
        const response = await axios.get("https://restcountries.com/v3.1/all");
        console.log(response.data);

    }
    catch (e){
        console.log(e);
    }
}

void fetchCountries();


// functie die fetch countries doet (try en catch) -- destructurting

// funtie die mapped en innerHTML


