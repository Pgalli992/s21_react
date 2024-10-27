import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipeById } from "../../services/apiRecipes";

const initialState = {
  status: "idle",
  selectetId: null,
  currentRecipe: {},
  error: "",
  bookmarks: [],
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      const selectedRecipe = action.payload;
      // Controlla se l'ID esiste già nei preferiti per evitare duplicati
      if (!state.bookmarks.includes(selectedRecipe)) {
        state.bookmarks.push(selectedRecipe);
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchRecipeById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.currentRecipe = action.payload;
        state.status = "idle";
      })

      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      }),
});

export const { addBookmark } = recipeSlice.actions;

export default recipeSlice.reducer;
