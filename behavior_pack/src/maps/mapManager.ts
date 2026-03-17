// SPDX-License-Identifier: MIT
// Copyright (c) @MaxedOut4826 & Contributors
// Contributors: @MaxedOut4826
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit

import { system } from "@minecraft/server";
import { RecipeManager, Recipe } from "./recipeManager.js";
import { configSettings } from "../constants/config.js";

export class BaseMap {
    recipeManager: RecipeManager = new RecipeManager();
    orders: Recipe[] = [];
    orderInterval: number = configSettings.orderInterval[0];
    orderChance: number = configSettings.orderChance[0];
    runId: number = -1;

    startOrderInterval() {
        if (this.runId !== -1) return;

        this.runId = system.runInterval(() => {
            const random = Math.random();

            if (random <= this.orderChance) {
                this.addOrder();
            }
        }, this.orderInterval);
    }

    stopOrderInterval() {
        system.clearRun(this.runId);
        this.runId = -1;
    }

    addOrder() {
        this.orders.push(this.recipeManager.getRandomRecipe());
    }
}

export class MapManager {
    private static MapsIndex: BaseMap[] = [];

    static addMap(map: BaseMap) {
        MapManager.MapsIndex.push(map);
    }
}
