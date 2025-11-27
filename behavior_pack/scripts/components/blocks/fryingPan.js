// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09 @jeanmajid
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit
import { BlockDataManager } from "../../blockData/blockDataManager";
import { ComponentManager } from "../componentManager";
import PlayerInventory from "../../PlayerInventory";
import SoundManager from "../../SoundManager";
import { getDefaultFryingPanBlockData } from "../../blockData/fryingPan";
ComponentManager.registerBlockComponent("bcc.cook:frying_pan" /* BlockId.fryingPan */, {
    onPlayerInteract: (event) => {
        const player = event.player;
        const block = event.block;
        const inventory = new PlayerInventory(player);
        const selectedSlot = inventory.getSelectedSlot();
        if (!selectedSlot.hasItem()) {
            pickupFryingPan(player, block);
            return;
        }
        addSelectedItemToFryingPan(block, selectedSlot);
    },
    beforeOnPlayerPlace: (event) => {
        const player = event.player;
        const block = event.block;
        const inventory = new PlayerInventory(player);
        const blockItemStack = inventory.getSelectedItem();
        const blockData = BlockDataManager.getBlockDataFromItemStack(blockItemStack, getDefaultFryingPanBlockData());
        BlockDataManager.setBlockData(block, blockData);
    },
    onPlayerBreak: (event) => {
        const block = event.block;
        BlockDataManager.clearBlockData(block);
    }
});
function addSelectedItemToFryingPan(block, selectedSlot) {
    const selectedItem = selectedSlot.getItem();
    if (!selectedItem.hasTag("bcc.cook:fryable"))
        return;
    const blockData = BlockDataManager.getBlockData(block, getDefaultFryingPanBlockData());
    blockData.items.push(selectedItem.typeId);
    BlockDataManager.setBlockData(block, blockData);
    selectedSlot.setItem();
}
function pickupFryingPan(player, block) {
    // block.getItemStack() returns the original block item and not the redefined block item for some reason
    // and we need the redefined block item since that one is not stackable
    const blockItemStack = BlockDataManager.getItemFromBlockWithData(block);
    const inventory = new PlayerInventory(player);
    if (block.hasTag("bcc.cook:counter_placeable_in_adventure"))
        blockItemStack.setCanPlaceOn(["minecraft:stone"]); // Replace with bcc.cook:counter once created
    inventory.give(blockItemStack);
    block.setType("minecraft:air");
    SoundManager.playSound("block.decorated_pot.insert", block.location);
}
