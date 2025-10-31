// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit
import { system, world } from "@minecraft/server";
import "./customComponents";
const onCounterPlaceableBlocks = ["bcc.cook:frying_pan"];
world.afterEvents.worldLoad.subscribe(() => {
});
system.runInterval(() => {
    let players = world.getAllPlayers();
    for (let player of players) {
        let container = player.getComponent("minecraft:inventory").container;
        let maxSlots = container.size;
        for (let i = 0; i < maxSlots; i++) {
            let item = container.getItem(i);
            if (!item)
                continue;
            if (onCounterPlaceableBlocks.includes(item.typeId)) {
                item.setCanPlaceOn(["minecraft:stone"]); // Replace with bcc.cook:counter once made
                container.setItem(i, item);
            }
        }
    }
});
