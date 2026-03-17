// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit
import { world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
let overworld;
export function getOverworld() {
    return overworld || (overworld = world.getDimension("minecraft:overworld"));
}
export function getAllPlayers() {
    return world.getAllPlayers();
}
export function setBlockState(block, stateName, value) {
    const blockPermutation = block.permutation;
    block.setPermutation(blockPermutation.withState(stateName, value));
}
export function permutationWithState(permutation, stateName, value) {
    return permutation.withState(stateName, value);
}
export function showTextDisplayForm(title, text, player) {
    new ActionFormData()
        .title(title)
        .body(text)
        .show(player);
}
