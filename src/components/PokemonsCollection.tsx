import React from "react";
import { Detail, PokemonDetail } from "../interface";
import PokemonList from "./PokemonList";
import clsx from "clsx";

interface Props {
  pokemons: PokemonDetail[];
  viewDetail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonsCollection: React.FC<Props> = (props) => {
  const { pokemons, viewDetail, setDetail } = props;
  const selectPokemon = (id: number) => {
    if (!viewDetail.isOpen) {
      setDetail({
        id: id,
        isOpen: true,
      });
    }
  };
  return (
    <div
      className={clsx(
        "flex flex-wrap items-center justify-center gap-4 mx-36 relative"
      )}
    >
      {viewDetail.isOpen ? (
        <div className="z-10 bg-slate-500 fixed top-0 left-0 h-screen w-screen"></div>
      ) : (
        <div></div>
      )}
      {pokemons.map((pokemon) => {
        return (
          <div
            key={pokemon.id}
            className="min-w-max"
            onClick={() => {
              selectPokemon(pokemon.id);
            }}
          >
            <PokemonList
              viewDetail={viewDetail}
              setDetail={setDetail}
              key={pokemon.id}
              name={pokemon.name}
              id={pokemon.id}
              ablities={pokemon.abilities}
              image={pokemon.sprites.front_default}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PokemonsCollection;
