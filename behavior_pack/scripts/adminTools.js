// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit
import { system } from "@minecraft/server";
import Vector from "./Vector.js";
import { BlockDataManager } from "./blockData/blockDataManager.js";
import PlayerInventory from "./PlayerInventory.js";
class AdminToolRegistry {
    static registeredTools = {};
    static registerTool(name, tool) {
        if (this.registeredTools[name])
            return;
        this.registeredTools[name] = tool;
    }
    static getTool(name) {
        return this.registeredTools[name];
    }
}
system.afterEvents.scriptEventReceive.subscribe(event => {
    const player = event.sourceEntity;
    if (!player || player.typeId !== "minecraft:player" || !player.hasTag("bcc.cook:admin"))
        return;
    let adminTool = AdminToolRegistry.getTool(event.id);
    if (adminTool)
        adminTool(player, event.message);
});
function getBlockData(player) {
    const block = player.getBlockFromViewDirection().block;
    console.warn(JSON.stringify(BlockDataManager.getBlockDataByLocation(Vector.from(block.location))));
}
AdminToolRegistry.registerTool("bcc.cook:getBlockData", getBlockData);
function getSelectedItemBlockData(player) {
    const inventory = new PlayerInventory(player);
    const selectedItem = inventory.getSelectedItem();
    if (!selectedItem) {
        console.warn("No item selected.");
        return;
    }
    const blockData = BlockDataManager.getBlockDataFromItemStack(selectedItem);
    console.warn(JSON.stringify(blockData));
}
AdminToolRegistry.registerTool("bcc.cook:getSelectedItemBlockData", getSelectedItemBlockData);
