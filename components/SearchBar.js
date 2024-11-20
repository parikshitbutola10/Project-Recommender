import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function SearchBar({ setResults, className }) {
  const [query, setQuery] = useState("");

  return (
    <div className={className}>
      <div className="flex flex-col
      items-center justify-center
      pv-4 pt-0
      rounded-lg
      shadow-lg
      space-y-4
      ">
        <form action='/search' method='GET' className="flex items-center justify-center w-full">
          <input
            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 text-black focus:ring-1 focus:ring-green-500"
            type="text"
            placeholder="search"
            id="search-box"
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type='submit' className="flex items-center justify-center w-12 h-12 ml-2 bg-red-500 dark:bg-green-500 text-white rounded-lg">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
    </div>
  );
}

