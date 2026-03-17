// SPDX-License-Identifier: MIT
// Copyright (c) @MaxedOut4826 & Contributors
// Contributors: @MaxedOut4826
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit
import { system } from "@minecraft/server";
import { RecipeManager } from "./recipeManager.js";
import { configSettings } from "../constants/config.js";
export class BaseMap {
    recipeManager = new RecipeManager();
    orders = [];
    orderInterval = configSettings.orderInterval[0];
    orderChance = configSettings.orderChance[0];
    runId = -1;
    startOrderInterval() {
        if (this.runId !== -1)
            return;
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
    static MapsIndex = [];
    static addMap(map) {
        MapManager.MapsIndex.push(map);
    }
}
