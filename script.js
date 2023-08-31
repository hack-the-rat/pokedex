const pokédex = document.getElementById("pokédex");

const fetchPokémon = async () => {

    const url = `https://pokeapi.co/api/v2/pokemon?limit=490`;
    const res = await fetch(url);
    const data = await res.json();
    const pokémon = data.results.map((result, index) => ({
        ...result,
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        height: (data.height * .1).toFixed(1),
        width: (data.weight * .1).toFixed(1)
    }));

    /* const promises = [];
    for (let i = 1; i <= 490; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }    

    Promise.all(promises).then((results) => {
        const pokémon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map( type => type.type.name).join(', '),
            height: (data.height * .1).toFixed(1),
            width: (data.weight * .1).toFixed(1),
            ability: data.abilities.map(ability => ability.ability.name).join(', '),
            moves: data.moves.map(move => move.move.name).slice(0, 10).join(', ')
        }));
        displayPokémon(pokémon);
    }); */
    console.log(data.results);
    displayPokémon(pokémon);
};

const displayPokémon = (pokémon) => {
    console.log(pokémon);
    const pokémonHTMLString = pokémon.map((pokéman) => `
        <li class="card" onclick="selectPokémon(${pokéman.id})">
            <img class="card-image" src="${pokéman.image}"/>
            <h2 class="card-title">${pokéman.id}. ${pokéman.name}</h2>
        </li>
    `).join('');
    pokédex.innerHTML = pokémonHTMLString;
};

const selectPokémon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokéman = await res.json();
    displayPopup(pokéman);
};

const displayPopup = (pokéman) => {
    console.log(pokéman);
    const image = pokéman.sprites['front_default'];
    const type = pokéman.types.map((type) => type.type.name).join(', ');
    const ability = pokéman.abilities.map(ability => ability.ability.name).join(', ');
    const moves = pokéman.moves.map(move => move.move.name).slice(0, 10).join(', ');
    const htmlString = `
        <div class="popup">
            <button id="closeBtn" onclick="closePopup()">Close</button>
            <div class="card">
                <img class="card-image" src="${image}"/>
                <h2 class="card-title">${pokéman.id}. ${pokéman.name}</h2>
                <p><small>Height: </small>${pokéman.height} | <small>Weight: </small>${pokéman.weight}</p>
                <p class="card-subtitle">Type: ${type}</p>
                <p class="card-subtitle">Ability: ${ability}</p>
                <p class="card-subtitle">Moves: ${moves}</p>
            </div>
        </div>
    `;
    pokédex.innerHTML = htmlString + pokédex.innerHTML;
    console.log(htmlString);
};

fetchPokémon();