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


async function fetchCountries(countryQuery) {
    try {
        //haal alleen de info op van het land wat gezocht wordt, dan wordt er sneller geladen (ipv info van alle landen ophalen, dan gaat het 5x langzamer)
        //hierdoor werkt het ook als je op gedeelte van naam van land zoekt (bijvoorbeeld Korea, of Netherla, of USA)
        const responseCountry = await axios.get(`https://restcountries.com/v2/name/${countryQuery}?fields=flag,name,population,subregion,capital,currencies,languages`);
        generateInnerHtml(responseCountry.data);
    } catch (e) {
        errorHandling(e);
    }
}

function errorHandling(e) {
    console.error(e);
    errorMessage.setAttribute('class', 'error-message');
    if (e.response.status === 404) {
        errorMessage.textContent = "This country doesn't exist, please try again | 404";
    } else if (e.response.status === 500) {
        errorMessage.textContent = "Internal server error | 500";
    } else {
        errorMessage.textContent = "Something went wrong, sorry. Please try again.";
    }
}

function generateStringFromArray(array, stringToAddBehindName) {
    let s = "";
    for (let i = 0; i < array.length; i++) {
        s += `${array[i].name}${stringToAddBehindName}`
        if (i < array.length - 2) {
            s += ", ";
        }
        if (i === array.length - 2) {
            s += " and ";
        }
    }
    return s;
}

function generateInnerHtml(country) {
    const {
        flag,
        name,
        subregion,
        population,
        capital,
        currencies,
        languages
    } = country[0];

    countryInformation.innerHTML =
        ` <div class="country-inner-row"> <img class="flag" src="${flag}" alt="Flag country">
                                        <h2>${name}</h2> </div>
                                        <p class="text-country-container">${name} is situated in ${subregion}. It has a population of ${population} people.<br> The capital is ${capital} and you can pay with ${generateStringFromArray(currencies, "'s")}.<br>
                                        They speak ${generateStringFromArray(languages, "")}.</p>`

}