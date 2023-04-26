import axios from "axios";

const inputField = document.getElementById("input-field");
const submitForm = document.getElementById("submit-form");
const countryInformation = document.getElementById("country-info");
const errorMessage = document.getElementById("error");


submitForm.addEventListener('submit', (event) => {
    countryInformation.innerHTML = "";
    errorMessage.textContent = "";
    event.preventDefault();
    void fetchCountries(inputField.value);
    inputField.value = "";
})

//?fields=flag,name,population,subregion,capital,currencies,languages
async function fetchCountries(countryQuery) {
    try {
        const response = await axios.get("https://restcountries.com/v2/all?fields=flag,name,population,subregion,capital,currencies,languages");
        const specificCountry = response.data.find((country) => {
                return country.name.toLowerCase() === countryQuery.toLowerCase();
            });
        if (specificCountry === undefined){
            errorHandling(specificCountry);
            }
        else {
           generateInnerHtml(specificCountry);
        }
    } catch (e) {
        errorHandling(e);
    }
}

function errorHandling(e) {
    //errors afvangen in console
    console.error(e);
    //errors communiceren in de UI
    if (e === undefined) {
        errorMessage.textContent = "This country doesn't exist, please try again."
    }
    else if (e.response.status === 404) {
        errorMessage.textContent = "Page not found | 404";
    } else if (e.response.status === 500) {
        errorMessage.textContent = "Internal server error | 500";
    }
    else {
        errorMessage.textContent = "Something went wrong, sorry. Please try again.";
    }
}

function generateStringFromArray(array, stringToAddBehindName) {
    let s ="";
    for (let i = 0; i < array.length; i++) {
        s += `${array[i].name}${stringToAddBehindName}`
        if (i < array.length-2){
            s += ", ";
        }
        if (i === array.length-2){
            s += " and ";
        }
    }
    return s;
    }

    function generateInnerHtml(country){
        const {
            flag,
            name,
            subregion,
            population,
            capital,
            currencies,
            languages
        } = country;

        countryInformation.innerHTML =
            ` <div class="country-inner-row"> <img class="flag" src="${flag}" alt="Flag country">
                                        <h2>${name}</h2> </div>
                                        <p>${name} is situated in ${subregion}. It has a population of ${population} people. </p>
                                        <p>The capital is ${capital} and you can pay with ${generateStringFromArray(currencies, "'s")}.</p>
                                        <p>They speak ${generateStringFromArray(languages, "")}.</p>`

    }