import { AiOutlineSearch } from "react-icons/ai";
import { useState, useEffect } from "react";
import useClickOutside from "./hooks/useClickOutside";
import { useDebounce } from "use-debounce"; // import use debounce package

const Search = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [autocomplete, setAutocomplete] = useState([]);
  const [searchParams, setSearchParams] = useState("");
  const [value] = useDebounce(searchParams, 1000);

  const collapes = () => {
    setIsExpanded(false);
  };

  const { ref } = useClickOutside(collapes);

  const expand = () => {
    setIsExpanded(true);
  };

  const fetchData = async () => {
    if (!searchParams || searchParams.trim() === "") return;
    setLoading(true);
    try {
      const url = `https://api.tvmaze.com/search/shows?q=${searchParams}`;
      const response = await fetch(url);

      if (response) {
        const dataResponse = await response.json();
        setAutocomplete(dataResponse);
      }
    } catch (error) {
      console.log("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [value]);

  return (
    <form
      ref={ref}
      className="max-w-[700px]  sm:w-[500px] w-full mx-auto relative shadow-xl"
    >
      <button className="absolute transition-colors hover:text-black top-1/2 -translate-y-1/2 left-4 text-xl text-gray-600">
        <AiOutlineSearch />
      </button>

      <input
        type="text"
        placeholder="Find..."
        onFocus={expand}
        className="outline-none border py-2 px-12  w-full rounded-md text-lg"
        value={searchParams}
        onChange={(e) => setSearchParams(e.target.value)}
      />
      <div
        className={`absolute transition-all overflow-y-scroll w-full rounded-md bg-white shadow-md  ${
          isExpanded ? "h-[20rem] opacity-100" : "h-0 opacity-0"
        }`}
      >
        <div className="py-2">
          <ul>
            {autocomplete.length === 0 &&
              autocomplete.map((data) => {
                const { show } = data;
                return (
                  <li
                    key={show.id}
                    className="flex justify-between cursor-pointer transition duration-500 px-5 py-2 hover:bg-gray-200 text-gray-600 items-center"
                  >
                    <div className="flex gap-8 items-center">
                      <img
                        src={show.image?.medium}
                        alt={show?.name}
                        className="w-[3rem]"
                      />
                      <h2 className="text-lg">{show?.name}</h2>
                    </div>
                    <h2>{show.rating.average || "N/A"}</h2>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </form>
  );
};
export default Search;
