// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09 @jeanmajid
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit
import { ComponentManager } from "../componentManager";
import SoundManager from "../../SoundManager";
import { BlockDataManager } from "../../blockData/blockDataManager";
import { getDefaultFryingPanBlockData } from "../../blockData/fryingPan";
import PlayerInventory from "../../PlayerInventory";
ComponentManager.registerBlockComponent("bcc.cook:trash_bin" /* BlockId.trashBin */, {
    onPlayerInteract: (event) => {
        const player = event.player;
        const inventory = new PlayerInventory(player);
        const selectedSlot = inventory.getSelectedSlot();
        // Make sure the player has an item in their hand
        const selectedItem = selectedSlot.getItem();
        if (!selectedItem)
            return;
        if (selectedItem.typeId === "bcc.cook:frying_pan" /* BlockId.fryingPan */) {
            // Keep the frying pan, but clear the contents of it
            // This behavior may need to be generalized to any item that can hold food
            // by using a tag like "bcc.cook:holds_trashable" or similar
            BlockDataManager.setItemStackBlockData(selectedItem, getDefaultFryingPanBlockData());
            selectedSlot.setItem(selectedItem);
        }
        else
            selectedSlot.setItem(); // Clear slot
        SoundManager.playSound("block.decorated_pot.insert", event.block.location, {
            pitch: 0.6,
        });
    },
});
