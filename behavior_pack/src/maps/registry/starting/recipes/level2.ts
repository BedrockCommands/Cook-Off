import { startingMap } from "../map.js";
import { simpleAlfredoRecipe } from "../../../../constants/recipes/western/simpleAlfredo.js";
import { hamburgerRecipe } from "../../../../constants/recipes/western/hamburger.js";
import { grilledCheeseRecipe } from "../../../../constants/recipes/western/grilledCheese.js";
import { chickenSoupRecipe } from "../../../../constants/recipes/western/chickenSoup.js";

startingMap.recipeManager.addRecipe(chickenSoupRecipe);
startingMap.recipeManager.addRecipe(grilledCheeseRecipe);
startingMap.recipeManager.addRecipe(hamburgerRecipe);
startingMap.recipeManager.addRecipe(simpleAlfredoRecipe);
