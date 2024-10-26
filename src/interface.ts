export interface Pokemons {
  name: string;
  url: string;
  id: number;
  sprites: {
    front_default: string;
  };
}

export interface Detail {
  id: number,
  isOpen: boolean
}

export interface PokemonDetail extends Pokemons {
  abilities?: {
    ability:{
      name: string
    };
    url:string;
  }[];
}