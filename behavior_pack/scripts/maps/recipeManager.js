// SPDX-License-Identifier: MIT
// Copyright (c) @MaxedOut4826 & Contributors
// Contributors: @MaxedOut4826
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit
export class RecipeManager {
    recipeArray = [];
    addRecipe(recipe) {
        this.recipeArray.push(recipe);
    }
    getRandomRecipe() {
        const randomIndex = Math.floor(Math.random() * this.recipeArray.length);
        return this.recipeArray[randomIndex];
    }
}
