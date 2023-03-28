import express, { Request, Response } from 'express';
import pokedex from './pokemon-data/pokedex.json';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());

// Endpoint for getting the list of valid Pokemon types
app.get('/types', (req: Request, res: Response) => {
  const types = new Set<string>();
  pokedex.forEach((pokemon) => {
    pokemon.type.forEach((type) => {
      types.add(type);
    });
  });
  res.json(Array.from(types));
});

// Endpoint for getting the Pokemon data, with optional filtering by type
app.get('/pokemon', (req: Request, res: Response) => {
  const { type } = req.query;
  let typedPokemon = pokedex;

  if (type) {
    typedPokemon = pokedex.filter((pokemon) => pokemon.type.includes(type.toString()));
  }
  res.json(typedPokemon);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
