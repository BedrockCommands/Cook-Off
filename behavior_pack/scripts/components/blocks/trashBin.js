// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09 @jeanmajid
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit
import { ComponentManager } from "../componentManager";
import SoundManager from "../../SoundManager";
ComponentManager.registerBlockComponent("bcc.cook:trash_bin" /* BlockId.trashBin */, {
    onPlayerInteract: (event) => {
        const player = event.player;
        const playerInventoryContainer = player.getComponent("minecraft:inventory").container;
        const selectedSlotIndex = player.selectedSlotIndex;
        const selectedSlot = playerInventoryContainer.getSlot(selectedSlotIndex);
        // Make sure the player has an item in their hand
        const selectedItem = selectedSlot.getItem();
        if (!selectedItem)
            return;
        if (selectedItem.typeId === "bcc.cook:frying_pan" /* BlockId.fryingPan */) {
            // Keep the frying pan, but clear the contents of it
            // This behavior may need to be generalized to any item that can hold food
        }
        else
            selectedSlot.setItem(); // Clear slot
        SoundManager.playSound("block.decorated_pot.insert", event.block.location, {
            pitch: 0.6,
        });
    },
});
