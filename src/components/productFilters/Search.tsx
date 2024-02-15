import { useState } from "react";
import { productType } from "../Product";

interface SearchProps {
  className?: string;
  setProducts: React.Dispatch<React.SetStateAction<productType[] | undefined>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const Search: React.FC<SearchProps> = ({
  className,
  setProducts,
  setError,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const search = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${inputValue}`
      );
      const data = await response.json();
      setProducts(data.products);
    } catch (err) {
      setError(
        err instanceof Error
          ? `Error fetching categories: ${err.message}`
          : `Unexpected error: ${err}`
      );
    }
  };

  return (
    <div className={`${className} text-center text-sm`}>
      <label htmlFor="search" className="block font-medium text-gray-500">
        Search
      </label>
      <div className="flex w-full items-center justify-between leading-tight text-center text-gray-500 border border-gray-200 rounded-lg bg-white">
        <div className="ml-2 my-2 px-2">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="search"
          id="default-search"
          className="my-2 outline-none"
          placeholder="Search for item..."
          required
        />
        <button
          className="mr-2 my-1 py-1 px-2 rounded-md hover:bg-blue-50 hover:text-gray-700"
          onClick={search}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;