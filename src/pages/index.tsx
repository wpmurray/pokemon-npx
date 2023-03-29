import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Dropdown from './dropdown';
import Display from './display';

const inter = Inter({ subsets: ['latin'] })

const Header = styled.header`
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
`;

interface Pokemon {
  id: number;
  name: {
    english: string;
    japanese: string;
    chinese: string;
    french: string;
  };
  type: string[];
  base: {
    HP: number;
    Attack: number;
    Defense: number;
    "Sp. Attack": number;
    "Sp. Defense": number;
    Speed: number;
  };
}

export default function Home() {

    //Setup initial type request, this won't need to run after initial load
    const [pokemonType, setPokemonTypes] = useState<string[]>([]);
    useEffect(() => {
      fetchPokemonTypes();
    }, []);
    const fetchPokemonTypes = () => {
      fetch('http://localhost:8000/types')
        .then((response: Response) => response.json())
        .then((types: string[]) => {
        setPokemonTypes(types);
      })
        .catch((error: Error) => console.error(error));
    };

    //Setup pokemon data query
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    //useEffect is below on line 70 to get selectedType changes
    const fetchPokemon = (type: string) => {
      fetch(`http://localhost:8000/pokemon?type=${type}`)
        .then((response: Response) => response.json())
        .then((pokemon: Pokemon[]) => {
        setPokemon(pokemon);
      })
        .catch((error: Error) => console.error(error));
    };

  //This allows the fetchPokemon query to run with the requested type each time it changes
  const [selectedType, setSelectedType] = useState<string>('');

  //This changes the query when the selectedtype is updateed
  useEffect(() => {
    fetchPokemon(selectedType);
  }, [selectedType]);

  //This sets the state of selected option and is used in onChange in Dropdown component
  const handleTypeChange = (selectedOption: { label: string; value: string }) => {
    setSelectedType(selectedOption.value);
  };

  return (
    <>
  <Head>
    <title>Pokemon</title>
    <meta name="description" content="View Pokemon" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Head>
  <Header>
      <Title>Pokemon</Title>
  </Header>
  <main className={styles.main}>
    <div className={styles.container}>
      <nav>
        <ul>
          <li>
            <Dropdown
              options={[{ value: '', label: 'Select a type' }, ...pokemonType.map(d => ({ value: d, label: d }))]}
              onChange={handleTypeChange}
            />
          </li>
        </ul>
      </nav>
      <main>
        {selectedType && (
          <section>
            <Display
              typedPokemon={selectedType}
              pokemonJson={pokemon}
            />
          </section>
        )}
      </main>
    </div>
  </main>
</>

  )
}