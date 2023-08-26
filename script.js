// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "2307-fsa-et-web-sf";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */
const fetchAllPlayers = async () => {
  try {
    // TODO
    const response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players");
    const data = await response.json() 
    return data.data.players
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};
/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    // TODO
    const response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players" + "/" + playerId);
    const data = await response.json()
    return data.data.player
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};
// fetchSinglePlayer(155);
/**
 * Updates `<main>` to display a list of all players.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player is displayed in a card with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, each card has two buttons:
 * - "See details" button that, when clicked, calls `renderSinglePlayer` to
 *    display more information about the player
 * - "Remove from roster" button that, when clicked, will call `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */
function createElement(objectt){
  this.element = document.createElement('div');
  // this.element.style.padding = "10px";
  const button1 = document.createElement('button');
  button1.innerHTML = "see details";
  const button2 = document.createElement('button');
  button2.innerHTML = "remove player";
  const name = document.createElement('h1');
  name.innerHTML = objectt.name;
  const id = document.createElement('h2');
  id.classList.add("id")
  id.innerHTML = objectt.id;
  const imgg = document.createElement('img')
  imgg.src = objectt.imageUrl;
  imgg.alt = 'image of: ' + objectt.name
  imgg.style.width = '100%';
  imgg.style.height = '200px';
  this.element.appendChild(name);
  this.element.appendChild(imgg);
  this.element.appendChild(id);
  this.element.appendChild(button1);
  this.element.appendChild(button2);
  document.querySelector('main').appendChild(this.element);
  button1.addEventListener("click", ()=>{
  renderSinglePlayer(objectt.id);
  });
  button2.addEventListener("click", goodbyeDog)

}

const goodbyeDog = (e) => {
  const goodbyeDog = e.target.parentNode;
  goodbyeDog.innerText = ""
}

const renderAllPlayers = (playerList) => {
  // TODO
  document.querySelector('main').innerHTML=""
  fetchAllPlayers().then(response => {
    response.forEach(i=>{
        createElement(i)
      });
  });
}
    
function createElement2(player){
      this.element = document.createElement('div');
      const button = document.createElement('button');
      button.innerHTML = "back to all players"
      const name1 = document.createElement('h1');
      name1.innerHTML = player.name;
      const id = document.createElement('h2');
      id.innerHTML = player.id;
      const breed = document.createElement('h2');
      breed.innerHTML = player.breed;
      const team = document.createElement('h3');
      if(player.team.name != 0){
      team.innerHTML = "Team name: " + player.team.name;
      }
      const imgg = document.createElement('img');
      this.element.style.justifyContent = "center";
      this.element.style.alignContent = "center";
      this.element.style.marginLeft = "320px";
      imgg.src = player.imageUrl;
      imgg.alt = 'image of: ' + player.name
      imgg.style.width = '600px';
      imgg.style.height = '600px';
      this.element.appendChild(name1);
      this.element.appendChild(id);
      this.element.appendChild(breed);
      this.element.appendChild(imgg);
      this.element.appendChild(button);
      this.element.appendChild(team);
      document.querySelector('main').appendChild(this.element);
      button.addEventListener("click", renderAllPlayers);
  
}
/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */
const renderSinglePlayer = (playerId) => {
  // TODO
  document.querySelector('main').innerHTML= ""
  fetchSinglePlayer(playerId).then(player=>{
      createElement2(player);
  })

};

/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

};

// This script will be run using Node when testing, so here we're doing a quick
// check to see if we're in Node or the browser, and exporting the functions
// we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    renderAllPlayers,
    renderSinglePlayer,
  };
} else {
  init();
}
