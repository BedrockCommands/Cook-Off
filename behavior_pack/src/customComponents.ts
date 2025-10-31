// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit

import { BlockComponentPlayerInteractEvent, system } from "@minecraft/server";
import SoundManager from "./SoundManager";
import PlayerInventory from "./PlayerInventory";

function pickupableInteract(event: BlockComponentPlayerInteractEvent) {
	let player = event.player;
	let block = event.block;
	let blockItemStack = block.getItemStack(1, true);
	let inventory = new PlayerInventory(player);
	inventory.give(blockItemStack);
	block.setType("minecraft:air");
	SoundManager.playSound("block.decorated_pot.insert", event.block.location);
}

function fryingPanInteract(event: BlockComponentPlayerInteractEvent) {
	let player = event.player;
	let inventory = new PlayerInventory(player);
	if (!inventory.getSelectedItem()) {
		// If player's hand is empty, pick up frying pan
		pickupableInteract(event);
		return;
	}
	let block = event.block;
}

function trashBinInteract(event: BlockComponentPlayerInteractEvent) {
	let player = event.player;
	let playerInventoryContainer = player.getComponent("minecraft:inventory").container;
	let selectedSlotIndex = player.selectedSlotIndex;
	let selectedSlot = playerInventoryContainer.getSlot(selectedSlotIndex);
	// Make sure the player has an item in their hand
	let selectedItem = selectedSlot.getItem();
	if (!selectedItem) return;

	if (selectedItem.typeId == "bcc.cook:frying_pan") {
		
	}
	else selectedSlot.setItem(); // Clear slot
	SoundManager.playSound("block.decorated_pot.insert", event.block.location, {
		pitch: 0.6
	});
}

system.beforeEvents.startup.subscribe(event => {
	let bcr = event.blockComponentRegistry;
	// bcr.registerCustomComponent("bcc.cook:pickupable", {
	// 	onPlayerInteract: pickupableInteract
	// });
	bcr.registerCustomComponent("bcc.cook:frying_pan", {
		onPlayerInteract: fryingPanInteract
	});
	bcr.registerCustomComponent("bcc.cook:trash_bin", {
		onPlayerInteract: trashBinInteract
	});
});