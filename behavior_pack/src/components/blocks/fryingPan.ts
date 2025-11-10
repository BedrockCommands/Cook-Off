// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09 @jeanmajid
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit

import { BlockComponentPlayerInteractEvent } from "@minecraft/server";
import { ComponentManager } from "../componentManager";
import PlayerInventory from "../../PlayerInventory";
import SoundManager from "../../SoundManager";
import { BlockId } from "../../constants/blockId";

ComponentManager.registerBlockComponent(BlockId.fryingPan, {
    onPlayerInteract: (event) => {
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
    },
});

function pickupableInteract(event: BlockComponentPlayerInteractEvent) {
    const player = event.player;
    const block = event.block;
    const blockItemStack = block.getItemStack(1, true);
    const inventory = new PlayerInventory(player);
    if (block.hasTag("bcc.cook:counter_placeable_in_adventure"))
            blockItemStack.setCanPlaceOn([ "minecraft:stone" ]); // Replace with bcc.cook:counter once created
    inventory.give(blockItemStack);
    block.setType("minecraft:air");
    SoundManager.playSound("block.decorated_pot.insert", event.block.location);
}
