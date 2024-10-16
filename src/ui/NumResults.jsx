import { useSelector } from "react-redux";

function NumResults() {
  const { recipes } = useSelector((state) => state.search);

  return (
    <span className="fixed left-1/4 top-[90%] w-auto -translate-x-[120%] rounded-full bg-primary-300 px-4 py-2">
      Recipes: {recipes.length}
    </span>
  );
}

export default NumResults;
