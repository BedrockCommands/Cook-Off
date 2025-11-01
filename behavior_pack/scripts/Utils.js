// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit
import { world } from "@minecraft/server";
export default class Utils {
    static overworld;
    static getOverworld() {
        return Utils.overworld || (Utils.overworld = world.getDimension("minecraft:overworld"));
    }
    static getAllPlayers() {
        return world.getAllPlayers();
    }
    static permutationWithState(permutation, stateName, value) {
        return permutation.withState(stateName, value);
    }
}
