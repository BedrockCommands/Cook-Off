// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09 @jeanmajid
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit
import { ComponentManager } from "../componentManager";
import { SoundManager } from "../../SoundManager";
import { ItemStack } from "@minecraft/server";
const itemPickupSoundId = "random.pop";
ComponentManager.registerBlockComponent("bcc.cook:storage_crate" /* BlockId.storageCrate */, {
    onPlayerInteract: (event, p) => {
        const player = event.player;
        if (player === undefined)
            return;
        const playerInventoryContainer = player.getComponent("minecraft:inventory").container;
        const selectedSlotIndex = player.selectedSlotIndex;
        const selectedSlot = playerInventoryContainer.getSlot(selectedSlotIndex);
        // Ensure the player does not have an item in their hand
        const selectedItem = selectedSlot.getItem();
        if (selectedItem)
            return;
        const params = p.params;
        const itemId = params.itemId;
        const amount = params.amount ?? 1;
        selectedSlot.setItem(new ItemStack(itemId, amount));
        SoundManager.playSound(itemPickupSoundId, event.block.location);
    },
});
