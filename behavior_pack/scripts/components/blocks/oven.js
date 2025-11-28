// SPDX-License-Identifier: MIT
// Copyright (c) @TheeMonster395 & Contributors
// Contributors: @TheeMonster395
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit
import { ComponentManager } from "../componentManager";
import PlayerInventory from "../../PlayerInventory";
ComponentManager.registerBlockComponent("bcc.cook:oven" /* BlockId.oven */, {
    onPlayerInteract: (event) => {
        const player = event.player;
        const inventory = new PlayerInventory(player);
        const selectedSlot = inventory.getSelectedSlot();
        if (!selectedSlot.hasItem()) {
            return;
        }
        // If an item that is placeble in the oven is in hand, place that item "in" the oven.
    },
});
