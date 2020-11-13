import API from './fetchCountries';
import countryCardTpl from '../templates/country-card.hbs';
import countryListTpl from '../templates/country-list.hbs';
import PNotify from 'pnotify/dist/es/PNotify';
PNotify.defaults.delay = '2000'
const debounce = require('lodash.debounce');
const refs = {
    countryCard: document.querySelector('.country-card'),
    searchInput: document.querySelector('.search-input')
};
refs.searchInput.addEventListener('input', debounce(onInput, 500));
function onInput(e) {
    e.preventDefault();
    const form = e.target;
    const searchQuery = form.value;
    if (searchQuery) {
        API.fetchCountries(searchQuery)
        .then(renderCountrieCard)
        .catch(onError)
    } else {clearInterface()}
}
function onError(error) {
    alert('Not found')
}
function renderCountrieCard(countrie) {
    const cardMarkup = countryCardTpl(countrie);
    const listMarkup = countryListTpl(countrie);
    if (countrie.length === 1) { refs.countryCard.innerHTML = cardMarkup; }
    else if (countrie.length >= 2 && countrie.length <= 10)
    { refs.countryCard.innerHTML = listMarkup; }
    else if (countrie.length > 10) { PNotify.error('Too many matches found. Please enter more specific query!'); }
}
function clearInterface() {
    refs.countryCard.innerHTML = ' ';
}