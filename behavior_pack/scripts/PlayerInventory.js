// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit
import Utils from "./Utils";
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
    clearItem(slotIndex) {
        this.setItem(slotIndex, undefined); // Clear slot
    }
    setItem(slotIndex, itemStack) {
        this.container.setItem(slotIndex, itemStack);
    }
    getItem(slotIndex) {
        return this.container.getItem(slotIndex);
    }
    hasEmptySlot() {
        return this.container.emptySlotsCount !== 0;
    }
    give(itemStack) {
        let amount = itemStack.amount;
        // TODO: use container.addItem instead
        for (let i = 0; i < this.container.size; i++) {
            const slot = this.container.getSlot(i);
            if (!slot.hasItem())
                continue;
            if (slot.isStackableWith(itemStack)) {
                const addable = Math.min(amount, slot.maxAmount - slot.amount);
                amount -= addable;
                slot.amount += addable;
            }
            // If there is no more left to distribute, end
            if (amount === 0)
                return;
        }
        const remainingItemStack = itemStack.clone();
        remainingItemStack.amount = amount;
        const slotIndex = this.container.firstEmptySlot();
        // slotIndex === undefined if there is no empty slot. In that case, spawn an item stack as an entity.
        if (slotIndex === undefined)
            Utils.getOverworld().spawnItem(remainingItemStack, this.player.location);
        else
            this.container.setItem(slotIndex, remainingItemStack);
    }
}
