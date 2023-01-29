import { useState } from "react";
import useSWR from "swr";
import Character from "./Character";
import "./main.css";

function List() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [sortBy, setSortBy] = useState<keyof Character>("name");

  const API_URL = `https://rickandmortyapi.com/api/character?name=${searchValue}`;

  const fetcher = (...args: [string, RequestInit?]) =>
    fetch(...args).then((res) => res.json());

  let { data: mainData } = useSWR(API_URL, fetcher);

  interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    url: string;
  }

  function filterCol(sortBy: keyof Character) {
    setSortBy(sortBy);
  }

  function handleRedirect(url: string) {
    setUrl(url);
  }

  return (
    <div className="main">
      <input
        placeholder="Character's name..."
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
      <table>
        <thead>
          <tr>
            <td onClick={() => filterCol("name")}>Name</td>
            <td onClick={() => filterCol("status")}>Status</td>
            <td onClick={() => filterCol("species")}>Species</td>
            <td>URL</td>
          </tr>
        </thead>
        <tbody>
          {mainData && !mainData.error ? (
            mainData.results
              .sort((a: Character, b: Character) =>
                a[sortBy] > b[sortBy] ? 1 : -1
              )
              .map((character: Character) => {
                return (
                  <tr key={character.id}>
                    <td>{character.name}</td>
                    <td>{character.status}</td>
                    <td>{character.species}</td>
                    <td onClick={() => handleRedirect(character.url)}>
                      {character.url}
                    </td>
                  </tr>
                );
              })
          ) : (
            <div className="entities">No entities!</div>
          )}
        </tbody>
      </table>
      {url.length > 0 && <Character url={url} />}
    </div>
  );
}
export default List;
