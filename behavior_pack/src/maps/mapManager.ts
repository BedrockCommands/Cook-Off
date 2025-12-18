// SPDX-License-Identifier: MIT
// Copyright (c) @MaxedOut4826 & Contributors
// Contributors: @MaxedOut4826
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit

import { RecipeManager, Recipe } from "./recipeManager.js";
import { configSettings } from "../constants/config.js";

export class BaseMap {
    recipeManager: RecipeManager = new RecipeManager();
    orders: Recipe[] = [];
    orderInterval: number = configSettings.orderInterval[0];
    orderChance: number = configSettings.orderChance[0];
}

export class MapManager {
    private static MapsIndex: BaseMap[] = [];

    static addMap(map: BaseMap) {
        MapManager.MapsIndex.push(map);
    }
}
