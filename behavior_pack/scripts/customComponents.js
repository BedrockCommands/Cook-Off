// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit
import { system } from "@minecraft/server";
import SoundManager from "./SoundManager";
import PlayerInventory from "./PlayerInventory";
function pickupableInteract(event) {
    const player = event.player;
    const block = event.block;
    const blockItemStack = block.getItemStack(1, true);
    const inventory = new PlayerInventory(player);
    if (block.hasTag("bcc.cook:counter_placeable_in_adventure"))
        blockItemStack.setCanPlaceOn(["minecraft:stone"]); // Replace with bcc.cook:counter once created
    inventory.give(blockItemStack);
    block.setType("minecraft:air");
    SoundManager.playSound("block.decorated_pot.insert", event.block.location);
}
function fryingPanInteract(event) {
    const player = event.player;
    const inventory = new PlayerInventory(player);
    const selectedSlot = inventory.getSelectedSlot();
    if (!selectedSlot.hasItem()) {
        // If player's hand is empty, pick up frying pan
        pickupableInteract(event);
        return;
    }
    const selectedItem = selectedSlot.getItem();
    const block = event.block;
    // When implemented: Add the currently selected item to the frying pan and remove it from the player
}
function trashBinInteract(event) {
    const player = event.player;
    const playerInventoryContainer = player.getComponent("minecraft:inventory").container;
    const selectedSlotIndex = player.selectedSlotIndex;
    const selectedSlot = playerInventoryContainer.getSlot(selectedSlotIndex);
    // Make sure the player has an item in their hand
    const selectedItem = selectedSlot.getItem();
    if (!selectedItem)
        return;
    if (selectedItem.typeId === "bcc.cook:frying_pan") {
        // Keep the frying pan, but clear the contents of it
        // This behavior may need to be generalized to any item that can hold food
    }
    else
        selectedSlot.setItem(); // Clear slot
    SoundManager.playSound("block.decorated_pot.insert", event.block.location, {
        pitch: 0.6
    });
}
system.beforeEvents.startup.subscribe(event => {
    const bcr = event.blockComponentRegistry;
    // bcr.registerCustomComponent("bcc.cook:pickupable", {
    // 	onPlayerInteract: pickupableInteract
    // });
    bcr.registerCustomComponent("bcc.cook:frying_pan", {
        onPlayerInteract: fryingPanInteract
    });
    bcr.registerCustomComponent("bcc.cook:trash_bin", {
        onPlayerInteract: trashBinInteract
    });
});
