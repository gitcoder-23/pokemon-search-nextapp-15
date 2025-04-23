"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

function PokemonDetails() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (name) {
      fetchPokemonDetails();
    }
  }, [name]);

  const fetchPokemonDetails = () => {
    setLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => {
        setPokemon(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex gap-8">
        {/* Left section: Back button */}
        <button
          className="text-teal-500 hover:text-teal-700 font-semibold"
          onClick={() => window.history.back()}
        >
          &lt; Back
        </button>

        {/* Right section: Pokemon details */}
        <div className="flex gap-8 bg-teal-100 p-6 rounded-lg w-full">
          {/* Left side: Pokemon image */}
          <div className="flex-none">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-64 h-64 object-cover"
            />
          </div>

          {/* Right side: Pokemon details */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-teal-800 mb-4">
              {pokemon.name}
            </h1>
            <div className="mb-4">
              <p className="text-lg text-teal-700">
                <strong>Type:</strong>{" "}
                {pokemon.types.map((type) => type.type.name).join(", ")}
              </p>
              <p className="text-lg text-teal-700">
                <strong>Height:</strong> {pokemon.height}m
              </p>
              <p className="text-lg text-teal-700">
                <strong>Weight:</strong> {pokemon.weight}kg
              </p>
              <p className="text-lg text-teal-700">
                <strong>Base Experience:</strong> {pokemon.base_experience}
              </p>
            </div>

            {/* Abilities Section */}
            <div className="bg-teal-200 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-teal-800">Abilities</h2>
              <ul className="mt-2">
                {pokemon.abilities.map((ability) => (
                  <li key={ability.ability.name} className="text-teal-600">
                    {ability.ability.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Moves Section */}
            <div className="bg-teal-200 p-4 rounded-lg mt-6">
              <h2 className="text-xl font-semibold text-teal-800">
                Some Moves
              </h2>
              <ul className="mt-2">
                {pokemon.moves.slice(0, 5).map((move) => (
                  <li key={move.move.name} className="text-teal-600">
                    {move.move.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetails;
