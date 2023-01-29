import useSWR from "swr";

function Character({ url }: { url: string }): JSX.Element {
  const fetcher = (...args: [string, RequestInit?]) =>
    fetch(...args).then((res) => res.json());

  let { data: characterData } = useSWR(url, fetcher);

  return (
    <div className="character">
      {characterData && !characterData.error ? (
        <div className="boxBig">
          <div className="boxLeft">
            <img src={characterData.image} />
          </div>
          <div className="boxRight">
            <p>
              <span>Name: </span>
              {characterData.name}
            </p>
            <p>
              <span>Status: </span>
              {characterData.status}
            </p>
            <p>
              <span>Species: </span>
              {characterData.species}
            </p>
            <p>
              <span>Type: </span>
              {characterData.type ? characterData.type : "None"}
            </p>
            <p>
              <span>Gender: </span>
              {characterData.gender}
            </p>
            <p>
              <span>Location: </span>
              {characterData.location.name}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Character;
