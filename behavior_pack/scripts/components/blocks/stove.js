// SPDX-License-Identifier: MIT
// Copyright (c) @TheeMonster395 & Contributors
// Contributors: @TheeMonster395
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit
import { ComponentManager } from "../componentManager";
import PlayerInventory from "../../PlayerInventory";
import Utils from "../../Utils";
import SoundManager from "../../SoundManager";
ComponentManager.registerBlockComponent("bcc.cook:stove" /* BlockId.stove */, {
    onPlayerInteract: (event) => {
        const overworld = Utils.getOverworld();
        const player = event.player;
        const inventory = new PlayerInventory(player);
        const selectedSlot = inventory.getSelectedSlot();
        const faceInteractedWith = event.face;
        if (faceInteractedWith !== "Up") {
            //play a sound here
            return;
        }
        if (!selectedSlot.hasItem()) {
            // play a sound here
            return;
        }
        const selectedItem = inventory.getSelectedItem();
        const itemId = selectedItem.typeId;
        if (!canPlaceOnStove[itemId]) {
            // play a sound here
            return;
        }
        const blockAbove = addVectors(event.block.location, { x: 0, y: 1, z: 0 });
        if (!overworld.getBlock(blockAbove).isAir) {
            // play a sound here
            return;
        }
        overworld.setBlockType(blockAbove, itemId);
        SoundManager.playSound(canPlaceOnStove[itemId].sound, player.location);
        // if an item that is placeble on the stove is in hand, place that item on the stove.
        // remove item from hand
    },
});
const canPlaceOnStove = {
    "bcc.cook:frying_pan": { sound: "sound of placing frying pan" },
    "bcc.cook:pot": { sound: "sound of placing pot" }
};
function addVectors(a, b) {
    return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}
