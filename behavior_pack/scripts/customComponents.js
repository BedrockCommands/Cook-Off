// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit
import { system } from "@minecraft/server";
import SoundManager from "./SoundManager";
function trashBinInteract(event) {
    let player = event.player;
    let playerInventoryContainer = player.getComponent("minecraft:inventory").container;
    let selectedSlotIndex = player.selectedSlotIndex;
    let selectedSlot = playerInventoryContainer.getSlot(selectedSlotIndex);
    // Make sure the player has an item in their hand
    let selectedItem = selectedSlot.getItem();
    if (!selectedItem)
        return;
    if (selectedItem.typeId == "bcc.cook:pan") {
    }
    else
        selectedSlot.setItem(); // Clear slot
    SoundManager.playSound("block.decorated_pot.insert", event.block.location, {
        pitch: 0.6
    });
}
system.beforeEvents.startup.subscribe(event => {
    let bcr = event.blockComponentRegistry;
    bcr.registerCustomComponent("bcc.cook:trash_bin", {
        onPlayerInteract: trashBinInteract
    });
});
