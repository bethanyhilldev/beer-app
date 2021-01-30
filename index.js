const URL = "https://api.openbrewerydb.org/breweries";

async function beerFetch() {
  const response = await fetch(`${URL}`);
  const data = response.json();
  return data
}

async function getBeerByType(type) {
  const response = await fetch(`${URL}?by_type=${type}`);
  const data = response.json();
  return data
}

async function searchBeer(param1) {
  const response = await fetch(`${URL}/search?query=${param1}`);
  const data = response.json();
  return data
}

function drawCard(param1,param2) {
  const brewpoptarget = document.querySelector(".brewerypop");
    let brewcard = "";

    if (param1 === null || param1.length === 0 || param1 === undefined) {
      brewpoptarget.innerHTML = `<p class="noresults">No results for "${param2}"</p>` 
      return
    }
    param1.forEach(brewery => {
      brewcard += `
        <div class="brewerycard">
            <h3 class="brewery-title">${brewery.name}</h3>
            <div class="phone">
                <i class="fas fa-phone"></i>${brewery.phone}
            </div>
            <div class="website">
                <i class="fas fa-globe"></i><a href="${brewery.website_url}">
                ${brewery.website_url}</a>
            </div>
            <div class="address">
                <i class="fas fa-map-marker-alt"></i>
                <span class="street">${brewery.street}</span><br>
                <span class="city">${brewery.city},</span>
                <span class="state">${brewery.state}</span>
            </div>    
        </div>
        `;
    })
    brewpoptarget.innerHTML = brewcard;
}


beerFetch()
  .then(response => {
    drawCard(response)
  })

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.beerbutton')
  for (const button of buttons) {
    button.addEventListener('click',(e) => {
      document.querySelector('.brewerypop').innerHTML = `<i class="fas fa-spinner fa-spin"></i>`
      const type = e.target.innerHTML.toLowerCase()
      getBeerByType(type)
      .then(response => {
        drawCard(response)
      })
    })
  }

  const searchDiv = document.querySelector(".search");
  const searchButton = document.querySelector(".searchbutton");
  const searchValue = document.querySelector(".searchbar");
  searchButton.onclick = () => {
    document.querySelector('.brewerypop').innerHTML = `<i class="fas fa-spinner fa-spin"></i>`
    searchBeer(searchValue.value)
    .then(response => {
      drawCard(response, searchValue.value)
    })
  }

  searchDiv.onkeyup = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      document.querySelector('.brewerypop').innerHTML = `<i class="fas fa-spinner fa-spin"></i>`
      searchButton.click();
    }
  }
})