import { system } from "@minecraft/server";
import SoundManager from "./SoundManager";
function trashBinInteract(event) {
    let player = event.player;
    let playerInventoryContainer = player.getComponent("minecraft:inventory").container;
    let selectedSlotIndex = player.selectedSlotIndex;
    let selectedSlot = playerInventoryContainer.getSlot(selectedSlotIndex);
    if (!selectedSlot.getItem())
        return;
    selectedSlot.setItem();
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
