

const URL = 'https://restcountries.eu/rest/v2/name';
function fetchCountries(searchQuery) {
    return fetch(`${URL}/${searchQuery}`)
        .then(response => {
    if (response.ok) return response.json();
    if (response.status == 404) throw new Error('Not found');}
    );
}
export default { fetchCountries };