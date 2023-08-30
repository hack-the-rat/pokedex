const pokédex = document.getElementById("pokédex");

console.log(pokédex);

const fetchPokémon = () => {

    const promises = [];
    for (let i = 1; i <= 384; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }    

    Promise.all(promises).then((results) => {
        const pokémon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map( type => type.type.name).join(', '),
            height: data.height,
            width: data.weight,
            ability: data.abilities.map(ability => ability.ability.name).join(', '),
            moves: data.moves.map(move => move.move.name).slice(0, 10).join(', ')
        }));
        displayPokemon(pokémon);
    });
};

const displayPokemon = (pokémon) => {
    console.log(pokémon);
    const pokémonHTMLString = pokémon.map((pokéman) => `
        <li class="card">
            <img class="card-image" src="${pokéman.image}"/>
            <h2 class="card.title">${pokéman.id}. ${pokéman.name}</h2>
            <p class="card-subtitle">Type: ${pokéman.type}</p>
            <p class="card-subtitle">Ability: ${pokéman.ability}</p>
            <p class="card-subtitle">Moves: ${pokéman.moves}</p>
        </li>
    `).join('');
    pokédex.innerHTML = pokémonHTMLString;
};

fetchPokémon();