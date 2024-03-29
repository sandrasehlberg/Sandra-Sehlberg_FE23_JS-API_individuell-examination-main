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

//CREATE SECTION WHICH WILL DISPLAY PLANET INFO UPON SEARCH BUTTON CLICK
submitBtn.addEventListener('click', function()
{ 
    let newDiv = document.createElement('div');
    newDiv.id = 'new-div';
    newDiv.className = "planet-info";
    let footer = document.querySelector('footer');
    document.body.insertBefore(newDiv, footer);
    
    let searchText = searchField.value; 

    let matchingPlanets = allPlanetsData.filter(planet => {
    return planet.name.toLowerCase().includes(searchText.toLowerCase());
});

//CLOSES INFO SECTION WHEN CLICKING ON THE CLOSE BUTTON
newDiv.addEventListener("click", e => {
    if (e.target.className === "close-btn") {
      newDiv.style.display = "none"
    }
  })

//FUNCTIONS FOR DISPLAYING PLANET INFO
newDiv.innerHTML = '';

matchingPlanets.forEach(planet => {
    let planetName = document.createElement('h1');
    planetName.innerHTML = planet.name;
    planetName.className = "planetNameClass";

    let latinLabel = document.createElement('h3');
    latinLabel.innerHTML = planet.latinName;
    latinLabel.className="planetLatinClass";

    let planetInfo = document.createElement('p');
    planetInfo.textContent = planet.desc;
    
    let planetSize = document.createElement('p');
    planetSize.innerHTML = '<b>OMKRETS:</b> ' + planet.circumference + ' km';

    let planetTempNight= document.createElement('p');
    planetTempNight.innerHTML = '<b>TEMPERATUR NATT: </b>' + planet.temp.night + ' C';
    
    let planetTempDay= document.createElement('p');
    planetTempDay.innerHTML = '<b>TEMPERATUR DAG: </b>' + planet.temp.day + ' C';
   
    let distanceInfo = document.createElement('p');
    distanceInfo.innerHTML = '<b>AVSTÅND FRÅN SOLEN:</b> ' + planet.distance + ' km';

    let orbitalInfo = document.createElement('p');
    orbitalInfo.innerHTML = '<b>ANTAL DYGN RUNT SOLEN PER ÅR:</b> ' + planet.orbitalPeriod;

    let closeButton = document.createElement('close-btn');
    closeButton.className = "close-btn"
    closeButton.innerText = 'STÄNG';

    newDiv.appendChild(planetName);
    newDiv.appendChild(latinLabel);  
    newDiv.appendChild(planetInfo);
    newDiv.appendChild(planetSize);
    newDiv.appendChild(planetTempNight);
    newDiv.appendChild(planetTempDay);
    newDiv.appendChild(distanceInfo);
    newDiv.appendChild(orbitalInfo);
    newDiv.appendChild(closeButton);
  

});

})
