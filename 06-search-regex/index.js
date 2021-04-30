const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = []; 

const main = async () => {
  const data = await fetch(endpoint);
  const data_json = await data.json();
  cities.push(...data_json);
};
main();

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function findingMatches(wordToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex)
  })
}

function displayMatches(){
  const matches = findingMatches(this.value, cities)  
  const html = matches.map( place => {
    const regex = new RegExp(this.value, 'gi')
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`)
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`)
      return `
      <li>
        <span class='name'>${cityName}, ${stateName}</span>
        <span class='population'> ${numberWithCommas(place.population)} </span>
      </li>
      `
  }).join('')
  searchOutput.innerHTML = html
}

const searchInput = document.querySelector('.search')
const searchOutput = document.querySelector('.suggestions')
searchInput.addEventListener('change', displayMatches)
searchInput.addEventListener('keyup', displayMatches)