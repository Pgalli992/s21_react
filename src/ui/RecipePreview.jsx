import { useDispatch } from "react-redux";
import noImg from "../assets/no_img.jpg";
import { fetchRecipeById } from "../services/apiRecipes";
import { useNavigate } from "react-router";
function RecipePreview({ recipe, onSelectRecipe }) {
  const { title, image, id } = recipe;
  // const { recipes, status } = useSelector((state) => state.currentRecipe);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImgError = function (e) {
    e.target.src = noImg;
  };

  function loadRecipeDetails({ id }) {
    onSelectRecipe({ id });
    navigate(`/search_recipes/${id}`);
    dispatch(fetchRecipeById(id));
    onSelectRecipe("");
  }

  return (
    <li
      className="flex items-center gap-4 rounded-md bg-primary-100 px-4 py-2 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-primary-200 hover:shadow-md"
      onClick={() => loadRecipeDetails({ id })}
    >
      <img
        src={image}
        className="aspect-square w-24 rounded-full object-cover"
        alt={title}
        onError={handleImgError}
      />
      <h2>{title}</h2>
    </li>
  );
}

export default RecipePreview;
