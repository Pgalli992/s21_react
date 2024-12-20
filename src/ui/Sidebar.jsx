import { useSelector } from "react-redux";
import { ColorRing } from "react-loader-spinner";
import NumResults from "./NumResults";
import RecipePreview from "./RecipePreview";

function Sidebar() {
  const { recipes, status } = useSelector((state) => state.search);

  if (status === "loading")
    return (
      <div className="flex h-1/2 items-center justify-center">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#698067", "#698067", "#698067", "#698067", "#698067"]}
        />
      </div>
    );

  return (
    <aside className="flex h-full overflow-y-auto shadow-xl">
      <ul className="flex h-full w-full flex-col items-center gap-2 pb-20">
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipePreview
              recipe={recipe}
              key={`preview-${recipe.id}`}
              showBookmarkicon={true}
            />
          ))
        ) : (
          <p className="pt-4 text-xl">No results available</p>
        )}
      </ul>
      {recipes.length > 0 && <NumResults />}
    </aside>
  );
}

export default Sidebar;
