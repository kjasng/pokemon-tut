import React, { useEffect, useState } from "react";
import { Detail } from "../interface";

interface Props {
  ablities:
    | {
        ability: {
          name: string;
        };
        url: string;
      }[]
    | undefined;
  name: string;
  id: number;
  image: string;
  viewDetail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonList: React.FC<Props> = (props) => {
  const { id, image, name, ablities, viewDetail, setDetail } = props;

  const [isSelected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(id === viewDetail.id);
  }, [viewDetail]);

  const closeDetail = () => {
    setDetail({
      id: 0,
      isOpen: false,
    });
  };

  return (
    <div className="flex justify-start">
      {isSelected ? (
        <section className="w-max absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 block py-2 px-2 rounded-lg z-20 bg-gradient-to-b from-purple-500 to-pink-500 text-white">
          <div className="w-max flex flex-col">
            <p className="text-end cursor-pointer" onClick={closeDetail}>
              X
            </p>
            <div className="flex flex-row justify-center items-center  ">
              <img src={image} alt="pokemon" />
              <p>{name}</p>
            </div>
            <div className="flex flex-wrap w-full">
              <p className="flex flex-row gap-2 flex-wrap px-2">
                Abilities: {"  "}
                <div>
                  {ablities?.map((ab: any) => {
                    return (
                      <div className="flex justify-start flex-row">
                        {ab.ability.name}
                      </div>
                    );
                  })}
                </div>
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section className="flex flex-col items-center justify-center bg-white p-2 rounded-lg flex-grow">
          <p>{name}</p>
          <img src={image} alt="" />
        </section>
      )}
    </div>
  );
};

export default PokemonList;
