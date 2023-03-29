import React, { useState, useEffect } from "react";
import styled from "styled-components";

//This file takes care of displaying the pokemon data that is queried in the main index page


//Build data interface to setup Pokemon[] array in props. This is the format of each object from the JSON
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

interface Props {
  typedPokemon: string;
  pokemonJson: Pokemon[];
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
  width: 500px;
  padding: 10px;
  margin: 10px 0;
`;

const Label = styled.span`
  font-weight: bold;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const PageButton = styled.button<{ active: boolean }>`
  border: none;
  background-color: ${({ active }) => (active ? '#333' : '#eee')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  cursor: ${({ active }) => (active ? 'default' : 'pointer')};
  font-size: 1rem;
  margin: 0 0.5rem;
  padding: 0.5rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ active }) => (active ? '#333' : '#ccc')};
    color: ${({ active }) => (active ? '#fff' : '#333')};
  }
`;

const Display: React.FC<Props> = ({ typedPokemon, pokemonJson }) => {
    //Check for prerender errors
    if (!pokemonJson) return null;

    //Setup pagination
    const PAGE_SIZE = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const numPages = Math.ceil(pokemonJson.length / PAGE_SIZE);
    const startIdx = (currentPage - 1) * PAGE_SIZE;
    const endIdx = startIdx + PAGE_SIZE;
    //Use this value to only show the page-specfic(10) pokemon
    const currentPokemon = pokemonJson.slice(startIdx, endIdx);

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <Container>
        <ListContainer>
            {currentPokemon.map((pokemon) => (
            <ListItem key={pokemon.id}>
            <div>
                <div>
                    <Label>ID:</Label> {pokemon.id}
                </div>
                <div>
                    <Label>Name:</Label> {pokemon.name.english}
                </div>
                <div>
                    <Label>Type:</Label> {pokemon.type.join(', ')}
                </div>
                </div>
                <div>
                <div>
                    <Label>HP:</Label> {pokemon.base.HP}
                </div>
                <div>
                    <Label>Attack:</Label> {pokemon.base.Attack}
                </div>
                <div>
                    <Label>Defense:</Label> {pokemon.base.Defense}
                </div>
                <div>
                    {/* <Label>Sp. Attack:</Label> {pokemon.base['Sp. Attack']} */}
                </div>
                <div>
                   {/*  <Label>Sp. Defense:</Label> {pokemon.base['Sp. Defense']} */}
                </div>
                <div>
                    <Label>Speed:</Label> {pokemon.base.Speed}
                </div>
                </div>
            </ListItem>
        ))}
        </ListContainer>
        <Pagination>
            {[...Array(numPages)].map((_, i) => (
            <PageButton
                key={i}
                onClick={() => handlePageClick(i + 1)}
                active={currentPage === i + 1}
            >
                {i + 1}
            </PageButton>
            ))}
        </Pagination>
        </Container>
    );
};

export default Display;
