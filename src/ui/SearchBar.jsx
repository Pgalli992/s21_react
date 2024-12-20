import { useNavigate } from "react-router";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchRecipesByQuery } from "../services/apiRecipes";
import { clearRecipes } from "../features/search/searchSlice";
import Button from "./Button";
// eslint-disable-next-line react/prop-types
function SearchBar({ placeholder = "" }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const { recipes, totalResults } = useSelector((state) => state.search);

  function handleSubmit(e) {
    e.preventDefault();
    if (!searchQuery) return;
    dispatch(clearRecipes());
    dispatch(fetchRecipesByQuery({ searchQuery }));
    navigate(`search_recipes`);
  }

  return (
    <div className="col-span-3 row-start-2 flex w-full items-center justify-center gap-4 md:col-span-1 md:col-start-2 md:row-start-1 md:gap-8">
      <form
        className="group relative flex h-full w-[90%] items-center justify-center gap-1 md:w-[70%]"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder={placeholder}
          className="text-md relative w-full rounded-full bg-primary-400 px-[12%] text-primary-900 caret-primary-900 shadow-sm outline-none transition-all duration-300 placeholder:text-primary-700 focus:scale-105 focus:pl-6 focus:placeholder-transparent focus:shadow-md md:h-10"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <button className="absolute left-2 flex aspect-square h-full items-center justify-center rounded-full bg-transparent text-primary-700 transition-all duration-500 group-focus-within:left-[100%] group-focus-within:-translate-x-1/2 group-focus-within:scale-105 group-focus-within:bg-primary-900 group-focus-within:text-primary-200">
          <HiMagnifyingGlass />
        </button>
      </form>
      {recipes.length < totalResults && (
        <Button
          text="Load more..."
          fontSizeInPixels="3"
          onClick={() => {
            dispatch(
              fetchRecipesByQuery({
                searchQuery: searchQuery,
                resultsAlreadyFetched: recipes.length,
              }),
            );
          }}
        />
      )}
    </div>
  );
}

export default SearchBar;
