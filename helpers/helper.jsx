import api from "../services/services";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import getPokemonData from "../utils/getPokemonData";
import getPokemonIdByUrl from "../utils/getPokemonIdByUrl";
import getPokemonImage from "../utils/getPokemonImage";
import axios from "axios";

export const fetchData = async (offset) => {
   
    const limit = 18;
     const apiResponse = await api.get('/pokemon', {
      params: {
        offset,
        limit,
      },
    });
     const { results } = apiResponse.data;
     const pokemonDataPromises = results.map(async (pokemon) => {
      const pokemonId = getPokemonIdByUrl(pokemon.url);
      
      const pokemonData = await getPokemonData(pokemonId);
      return pokemonData;
    });
     const pokemonDsata = await Promise.all(pokemonDataPromises);  

      return pokemonDsata
  };

  export const fetchPokemon = async (pokemon_name) => {
   
    try {
      const pokemonData = await getPokemonData(String(pokemon_name));
      console.log("this is the pokemonData",pokemonData)
      return pokemonData
    } catch (err) {
        console.log("err")
    }
  };


 export const EvolutionController = async (id) => {
      try {
       // Replace with the actual Pokemon ID
  
        const { data: pokemonSpecieData } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`,
        );
  
        const pokemonIdInEvolutionChain = getPokemonIdByUrl(
          pokemonSpecieData.evolution_chain.url,
        );
  
        const { data: evolutionChain } = await axios.get(
          `https://pokeapi.co/api/v2/evolution-chain/${pokemonIdInEvolutionChain}`,
        );
  
        const evolutionFormatted = evolutionChain.chain.evolves_to.map(
          (evolves) => {
            const {
              name: baseFormName,
              url: baseFormUrl,
            } = evolutionChain.chain.species;
  
            const base_form = {
              name: capitalizeFirstLetter(baseFormName),
              url: evolutionChain.chain.species.url,
              image: getPokemonImage(getPokemonIdByUrl(baseFormUrl)),
            };
  
            let second_evolution;
  
            if (evolves.evolves_to.length !== 0) {
              evolves.evolves_to.map((secondEvolves) => {
                const secondEvolutionPokemonId = getPokemonIdByUrl(
                  secondEvolves.species.url,
                );
  
                second_evolution = {
                  name: capitalizeFirstLetter(secondEvolves.species.name),
                  url: secondEvolves.species.url,
                  min_level: secondEvolves.evolution_details[0].min_level,
                  image: getPokemonImage(secondEvolutionPokemonId),
                };
  
                return second_evolution;
              });
            }
  
            const firstEvolutionPokemonId = getPokemonIdByUrl(
              evolves.species.url,
            );
  
            const first_evolution = {
              name: capitalizeFirstLetter(evolves.species.name),
              url: evolves.species.url,
              min_level: evolves.evolution_details[0].min_level,
              image: getPokemonImage(firstEvolutionPokemonId),
            };
  
            return {
              base_form,
              first_evolution,
              second_evolution,
            };
          }
        );
  
        return evolutionFormatted[0]; // Display the formatted evolution data in the console
      } catch (error) {
        console.error(error);
        return error
      }
    }


    export const TypesEffectiveness = async (type) => {
        const typesData = await axios.get('https://pokeapi.co/api/v2/type');
    
        const typeData = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
    
        const allTypes = typesData.data.results;
    
        const damage_relations = [];
    
        typeData.data.damage_relations.double_damage_from.map(damageType =>
          damage_relations.push({
            multiplier: '2x',
            type: capitalizeFirstLetter(damageType.name),
          }),
        );
    
        typeData.data.damage_relations.half_damage_from.map(damageType =>
          damage_relations.push({
            multiplier: '0.5x',
            type: capitalizeFirstLetter(damageType.name),
          }),
        );
    
        const leftTypes = allTypes.filter(
          ({ name }) =>
            !damage_relations.some(
              ({ type: TypeName }) => TypeName.toLocaleLowerCase() === name,
            ),
        );
    
        leftTypes.splice(leftTypes.length - 2);
    
        leftTypes.map(leftType =>
          damage_relations.push({
            multiplier: '1x',
            type: capitalizeFirstLetter(leftType.name),
          }),
        );
    
        return damage_relations;
      };
    
     