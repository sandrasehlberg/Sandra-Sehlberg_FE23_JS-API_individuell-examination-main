//BASE URL

const baseUrl=("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com"); 
const searchField=document.getElementById("search-field");
const submitBtn=document.getElementById("input-button");
const resultSearch=document.getElementById("search-results");

//FETCH/POST API KEY AND GET DATA

let allPlanetsData = [];
fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys', {
    method: 'POST',
})
.then(response => response.json())
.then(data => {
    console.log(data); 
    let apiKey = data.key;     

    return fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', {
        method: 'GET',
        headers: {'x-zocom': apiKey}    
    });
})
.then(response => response.json())
.then(data => {
    allPlanetsData = data.bodies;   
    console.log('allPlanetsData:', allPlanetsData); 
})
.catch(error => {
    console.error('Något gick fel:', error); 
});

//GET SEARCH RESULTS AND DISPLAY DATA

submitBtn.addEventListener('click', function()
{ 
    let newDiv = document.createElement('div');
    newDiv.id = 'new-div';
    newDiv.className = "overlay";
    let footer = document.querySelector('footer');
    document.body.insertBefore(newDiv, footer);
    let searchText = searchField.value; 

let matchingPlanets = allPlanetsData.filter(planet => {
    return planet.name.toLowerCase().includes(searchText.toLowerCase());
});
newDiv.innerHTML = '';

matchingPlanets.forEach(planet => {
    let planetName = document.createElement('h1');
    planetName.textContent = planet.name;
    planetName.className = "planetNameClass";

    let latinLabel = document.createElement('h3');
    latinLabel.innerHTML = planet.latinName;
    latinLabel.className="planetLatinClass";

    let planetInfo = document.createElement('p');
    planetInfo.textContent = planet.desc;
    
    let planetArea = document.createElement('p');
    planetArea.innerHTML = 'OMKRETS: ' + planet.circumference + ' km';
   
    let distanceInfo = document.createElement('p');
    distanceInfo.innerHTML = 'AVSTÅND FRÅN SOLEN: ' + planet.distance + ' km';


  newDiv.appendChild(planetName);
  newDiv.appendChild(latinLabel);  
  newDiv.appendChild(planetInfo);
  newDiv.appendChild(planetArea);
  newDiv.appendChild(distanceInfo);
 
});
})
