// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit
export default class PlayerInventory {
    player;
    inventoryComponent;
    container;
    constructor(player) {
        this.player = player;
        this.inventoryComponent = player.getComponent("minecraft:inventory");
        this.container = this.inventoryComponent.container;
    }
    getSelectedSlot() {
        return this.container.getSlot(this.player.selectedSlotIndex);
    }
    getSelectedItem() {
        return this.container.getItem(this.player.selectedSlotIndex);
    }
    give(itemStack) {
        let slotIndex = this.container.firstEmptySlot();
        this.container.setItem(slotIndex, itemStack);
    }
}
