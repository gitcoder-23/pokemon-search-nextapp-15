"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [types, setTypes] = useState([]);

  useEffect(() => {
    // Fetch Pokémon types for the dropdown
    fetch("https://pokeapi.co/api/v2/type")
      .then((res) => res.json())
      .then((data) => setTypes(data.results));
  }, []);

  useEffect(() => {
    fetchPokemons();
  }, [search, selectedType]);

  const fetchPokemons = async () => {
    let url;

    // If "all" is selected, fetch all Pokémon
    if (selectedType === "all") {
      url = `https://pokeapi.co/api/v2/pokemon?limit=1000`; // Fetching all Pokémon with a high limit
    } else {
      url = `https://pokeapi.co/api/v2/type/${selectedType}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    // If we fetched by type, filter by search
    let filteredPokemons = [];
    if (selectedType === "all") {
      // When "all" is selected, we fetch all Pokémon
      filteredPokemons = data.results.filter((pokemon) =>
        pokemon.name.includes(search.toLowerCase())
      );
    } else {
      // If we fetched by type, filter the Pokémon in that type
      filteredPokemons = data.pokemon.filter((pokemon) =>
        pokemon.pokemon.name.includes(search.toLowerCase())
      );
    }

    setPokemons(filteredPokemons);
  };
  //   const handleSearchChange = (e) => setSearch(e.target.value);

  const handleSearchChange = (e) => {
    setSearch(e.target.value); // This just updates the search term when typing
  };

  //   const handleSearch = () => {
  //     // Trigger the search when the button is clicked
  //     console.log("Search for:", search);

  //     if (search == "") {
  //       fetchPokemons();
  //     }

  //     // Fetch or filter Pokémon data based on the search term
  //     const filteredPokemons = pokemons.filter((pokemon) =>
  //       pokemon.name.toLowerCase().includes(search.toLowerCase())
  //     );

  //     setPokemons(filteredPokemons); // Update the displayed Pokémon list
  //   };

  const handleTypeChange = (e) => setSelectedType(e.target.value);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Example PokemonList Screen UI</h1>
      <div className="flex gap-4 mb-6">
        <select
          className="p-2 border rounded-md"
          onChange={handleTypeChange}
          value={selectedType}
        >
          <option value="all">Select</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="p-2 border rounded-md"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
        />
        {/* <button
            className="bg-blue-500 text-white p-2 rounded-md"
            onClick={handleSearch}
          >
            Search
          </button> */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pokemons.length > 0 ? (
          pokemons.map((pokemon, index) => (
            <div key={index} className="border p-4 rounded-md">
              <img
                src={
                  selectedType === "all"
                    ? pokemon.url?.split("/")[6]
                      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                          pokemon.url.split("/")[6]
                        }.png`
                      : "default-image.png"
                    : pokemon.pokemon?.url?.split("/")[6]
                    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                        pokemon.pokemon.url.split("/")[6]
                      }.png`
                    : "default-image.png"
                }
                alt={
                  selectedType === "all" ? pokemon.name : pokemon?.pokemon?.name
                }
                className="w-24 h-24 mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-center">
                {selectedType === "all" ? pokemon.name : pokemon?.pokemon?.name}
              </h2>
              <Link
                href={`/pokemon/${pokemon?.name}`}
                className="text-blue-500 text-center block mt-4"
              >
                Details →
              </Link>
            </div>
          ))
        ) : (
          <div>No Pokémon found for this search.</div>
        )}
      </div>
    </div>
  );
}
