import RecipeBox from "../ui/RecipeBox";
import Sidebar from "../ui/Sidebar";
import { useParams } from "react-router";

function SearchedRecipes() {
  let { recipeId } = useParams();

  return (
    <>
      <Sidebar />
      {recipeId && <RecipeBox id={recipeId} />}
    </>
  );
}

export default SearchedRecipes;
