// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit

import { Container, ContainerSlot, EntityInventoryComponent, ItemStack, Player } from "@minecraft/server";
import Utils from "./Utils";

export default class PlayerInventory {
	private inventoryComponent: EntityInventoryComponent;
	public container: Container;

	public constructor(public player: Player) {
		this.inventoryComponent = player.getComponent("minecraft:inventory");
		this.container = this.inventoryComponent.container;
	}

	public getSelectedSlot(): ContainerSlot {
		return this.container.getSlot(this.player.selectedSlotIndex);
	}

	public getSelectedItem(): ItemStack {
		return this.container.getItem(this.player.selectedSlotIndex);
	}

	public clearItem(slotIndex: number): void {
		this.setItem(slotIndex, undefined); // Clear slot
	}

	public setItem(slotIndex: number, itemStack?: ItemStack): void {
		this.container.setItem(slotIndex, itemStack);
	}

	public getItem(slotIndex: number): ItemStack {
		return this.container.getItem(slotIndex);
	}

	public hasEmptySlot(): boolean {
		return this.container.emptySlotsCount !== 0;
	}

	public give(itemStack: ItemStack): void {
		let amount = itemStack.amount;
		// TODO: use container.addItem instead
		for (let i = 0; i < this.container.size; i++) {
			const slot = this.container.getSlot(i);
			if (!slot.hasItem()) continue;
			if (slot.isStackableWith(itemStack)) {
				const addable = Math.min(amount, slot.maxAmount - slot.amount);
				amount -= addable;
				slot.amount += addable;
			}
			// If there is no more left to distribute, end
			if (amount === 0) return;
		}
		const remainingItemStack = itemStack.clone();
		remainingItemStack.amount = amount;

		const slotIndex = this.container.firstEmptySlot();
		// slotIndex === undefined if there is no empty slot. In that case, spawn an item stack as an entity.
		if (slotIndex === undefined) Utils.getOverworld().spawnItem(remainingItemStack, this.player.location);
		else this.container.setItem(slotIndex, remainingItemStack);
	}
}