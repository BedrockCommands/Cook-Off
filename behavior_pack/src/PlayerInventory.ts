// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit

import { Container, ContainerSlot, EntityInventoryComponent, ItemStack, Player } from "@minecraft/server";

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

	public give(itemStack: ItemStack): void {
		let slotIndex = this.container.firstEmptySlot();
		this.container.setItem(slotIndex, itemStack);
	}
}