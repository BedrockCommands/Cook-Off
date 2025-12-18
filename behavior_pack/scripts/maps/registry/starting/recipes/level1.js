import { startingMap } from "../map.js";
import { cheeseburgerRecipe } from "../../../../constants/recipes/western/cheeseburger.js";
import { chickenPastaCarbonaraRecipe } from "../../../../constants/recipes/western/chickenPastaCarbonara.js";
import { chickenSaladRecipe } from "../../../../constants/recipes/western/chickenSalad.js";
import { chickenAlfredoRecipe } from "../../../../constants/recipes/western/chickenAlfredo.js";
startingMap.recipeManager.addRecipe(cheeseburgerRecipe);
startingMap.recipeManager.addRecipe(chickenAlfredoRecipe);
startingMap.recipeManager.addRecipe(chickenPastaCarbonaraRecipe);
startingMap.recipeManager.addRecipe(chickenSaladRecipe);
