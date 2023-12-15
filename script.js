// Function to get Pokemon data
async function getPokemonData(num) {
    let url = `https://pokeapi.co/api/v2/pokemon/${num}`;

    return fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Error fetching Pokemon #${num}: ${res.status} ${res.statusText}`);
            }
            return res.json();
        })
        .catch(error => {
            console.error(`Error fetching Pokemon #${num}:`, error);
            throw error;
        });
}

// Function to create a Pokemon card
function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div>
            <img src="${pokemon.sprites.front_default}" alt="" class="img">
            <h3>${pokemon.name}</h3>
            <p>Number: ${pokemon.id}</p>
        </div>
    `;
    return card;
}

// Function to create a Pokemon container
function createPokemonContainer() {
    const container = document.createElement('div');
    container.classList.add('pokemon-container');
    return container;
}

// Function to render a specific range of Pokemon
async function renderPokemonRange(start, end) {
    const container = document.getElementById('pokemonContainer');

    for (let i = start; i <= end; i++) {
        try {
            const pokemon = await getPokemonData(i);
            const card = createPokemonCard(pokemon);
            const pokemonContainer = createPokemonContainer();
            pokemonContainer.appendChild(card);
            container.appendChild(pokemonContainer);
        } catch (error) {
            console.error(error);
        }
    }
}

// ... (previous code)

// Function to create a Pokemon card with click event
function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    // Add click event to each card
    card.addEventListener('click', async () => {
        try {
            const detailedPokemon = await getPokemonData(pokemon.id); // Fetch detailed information
            updatePokemonCard(card, detailedPokemon); // Update the card content
        } catch (error) {
            console.error(error);
        }
    });

    card.innerHTML = `
        <div>
            <img src="${pokemon.sprites.front_default}" alt="" class="img">
            <h3>${pokemon.name}</h3>
            <p>Number: ${pokemon.id}</p>
        </div>
    `;
    return card;
}

// Function to update Pokemon card content
function updatePokemonCard(card, detailedPokemon) {
    const cardContent = card.querySelector('div');
    cardContent.innerHTML = `
        <img src="${detailedPokemon.sprites.front_default}" alt="" class="img">
        <h3>${detailedPokemon.name}</h3>
        <p>Number: ${detailedPokemon.id}</p>
        <p>Type: ${detailedPokemon.types.map(type => type.type.name).join(', ')}</p>
        <p>Height: ${detailedPokemon.height}</p>
        <p>Weight: ${detailedPokemon.weight}</p>
    `;
}
// ... (previous code)

// Function to create a Pokemon card with click event
function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.classList.add('card');

    // Add click event to each card
    card.addEventListener('click', async () => {
        try {
            const detailedPokemon = await getPokemonData(pokemon.id);

            // Create a link to info.html with the Pokemon's ID as a query parameter
            const infoLink = document.createElement('a');
            infoLink.href = `info.html?id=${pokemon.id}`;
            infoLink.style.display = 'none'; // Hide the link
            document.body.appendChild(infoLink);

            // Simulate a click on the hidden link to navigate to info.html
            infoLink.click();

            // Clean up: remove the link from the DOM
            document.body.removeChild(infoLink);
        } catch (error) {
            console.error(error);
        }
    });

    card.innerHTML = `
        <div>
            <img src="${pokemon.sprites.front_default}" alt="" class="img">
            <h3>${pokemon.name}</h3>
            <p>Number: ${pokemon.id}</p>
        </div>
    `;
    return card;
}

function loadNextPokemon() {
    const container = document.getElementById('pokemonContainer');
    const currentPokemonCount = container.getElementsByClassName('pokemon-container').length;

    renderPokemonRange(currentPokemonCount + 1, currentPokemonCount + 20);
}

document.addEventListener('DOMContentLoaded', function () {
    renderPokemonRange(1, 20);

    // More button
    const moreButton = document.getElementById('moreButton');
    moreButton.addEventListener('click', loadNextPokemon);
});
