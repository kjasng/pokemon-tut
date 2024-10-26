import { useEffect, useState } from "react";
import "./input.css";
import axios from "axios";
import PokemonsCollection from "./components/PokemonsCollection";
import { Detail, Pokemons } from "./interface";
import { clsx } from "clsx";

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemons[]>([]);
  const [nextPage, setNextPage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [viewDetail, setViewDetail] = useState<Detail>({
    id: 0,
    isOpen: false,
  });

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
      );
      // console.log(res.data);
      setNextPage(res.data.next);
      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );

        setPokemons((prev) => [...prev, poke.data]);
      });
    };

    getPokemon();
  }, []);

  const loadMorePokemons = async () => {
    setLoading(true);
    let res = await axios.get(nextPage);
    setNextPage(res.data.next);
    res.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );

      setPokemons((prev) => [...prev, poke.data]);
    });

    setLoading(false);
  };

  return (
    <div className={clsx("w-full min-h-screen bg-slate-500 flex")}>
      <div className="flex flex-col items-center justify-start gap-8 h-max bg-slate-500 py-24 flex-grow">
        <h1 className="text-4xl font-bold text-cyan-300 tracking-widest z-20">
          Pokemon
        </h1>
        <PokemonsCollection
          pokemons={pokemons}
          viewDetail={viewDetail}
          setDetail={setViewDetail}
        />
        <button
          className="bg-white px-6 py-2 font-bold rounded-lg"
          onClick={loadMorePokemons}
        >
          {loading ? "Loading..." : "Load more pokemons"}
        </button>
      </div>
    </div>
  );
};

export default App;
