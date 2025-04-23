"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

function PokemonDetails() {
  const { name } = useParams();
  console.log("name=>", name);

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
        console.log("res=>", res);

        setPokemon(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon details:", error);
        setLoading(false);
      });
  };

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{pokemon.name}</h1>
          <div className="flex gap-4">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-48 h-48"
            />
            <div>
              <p>
                <strong>Height:</strong> {pokemon.height}
              </p>
              <p>
                <strong>Weight:</strong> {pokemon.weight}
              </p>
              <p>
                <strong>Base Experience:</strong> {pokemon.base_experience}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 p-4 rounded-md">
          <h2 className="text-xl font-semibold">Abilities</h2>
          <ul className="mt-2">
            {pokemon.abilities.map((ability) => (
              <li key={ability.ability.name} className="text-blue-500">
                {ability.ability.name}
              </li>
            ))}
          </ul>
        </div>
      </div>{" "}
    </div>
  );
}

export default PokemonDetails;

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function PokemonDetails() {
//   const router = useRouter();
//   console.log("router", router);

//   const { name } = router.query;

//   return (
//     <div>
//       <h1>Pokémon Details</h1>
//       {/* <ul>
//         {pokemons.map((pokemon) => (
//           <li key={pokemon.name}>
//             <a href={`/pokemon/${pokemon.name}`}>{pokemon.name}</a>
//           </li>
//         ))}
//       </ul> */}
//     </div>
//   );
// }
