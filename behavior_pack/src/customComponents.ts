import { BlockComponentPlayerInteractEvent, system } from "@minecraft/server";
import SoundManager from "./SoundManager";

function trashbinInteract(event: BlockComponentPlayerInteractEvent) {
	let player = event.player;
	let playerInventoryContainer = player.getComponent("minecraft:inventory").container;
	let selectedSlotIndex = player.selectedSlotIndex;
	let selectedSlot = playerInventoryContainer.getSlot(selectedSlotIndex);
	// Make sure the player has an item in their hand
	if (!selectedSlot.getItem()) return;
	selectedSlot.setItem(); // Clear slot
	SoundManager.playSound("block.decorated_pot.insert", event.block.location, {
		pitch: 0.6
	});
}

system.beforeEvents.startup.subscribe(event => {
	let bcr = event.blockComponentRegistry;
	bcr.registerCustomComponent("bcc.cook:trashbin", {
		onPlayerInteract: trashbinInteract
	})
});