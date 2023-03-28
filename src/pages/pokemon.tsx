import React, { useState, useEffect } from 'react';

const Pokemons = () => {
    const [pokemons, setPokemons] = useState<string[]>([]);
useEffect(() => {
    fetchPokemonTypes();
}, []);
const fetchPokemonTypes = () => {
    fetch('http://localhost:8000/types')
    .then((response: Response) => response.json())
        .then((types: string[]) => {
        console.log(types);
        setPokemons(types);
    })
    .catch((error: Error) => console.error(error));
};
  return(pokemons);
    {/* <div>
      <h1>Pokemondo</h1>
      <div className='poke-container'>
        {pokemons.map((pokemon) => (
            <div className='card'>
                <p>{pokemon}</p>
            </div>
        ))}
      </div>
    </div> */}
  //);
};
export default Pokemons;