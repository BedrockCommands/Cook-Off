import { ComponentManager } from "../componentManager";
import { PlayerInventory } from "../../PlayerInventory";
import { PickupableCustomComponent } from "./pickupableCustomComponent";
import { BlockDataManager } from "../../blockData/blockDataManager";
import { SoundManager } from "../../SoundManager";
const BowlPickupSoundId = "block.decorated_pot.insert";
class BowlCustomComponent extends PickupableCustomComponent {
    onPlayerInteract = (event) => {
        const player = event.player;
        if (player === undefined)
            return;
        const block = event.block;
        const inventory = new PlayerInventory(player);
        const selectedSlot = inventory.getSelectedSlot();
        const selectedItem = selectedSlot.getItem();
        if (selectedItem === undefined) {
            this.pickupBowl(block, player);
            return;
        }
        if (selectedItem.typeId !== "bcc.cook:pot" /* BlockId.pot */)
            return;
        let potBlockData = BlockDataManager.getBlockDataFromItemStack(selectedItem);
        // To do: implement recipies
        console.warn("You just put what was in the pot in the bowl! (use your imagination for now :])");
        potBlockData.items = [];
        BlockDataManager.setItemStackBlockData(selectedItem, potBlockData);
        selectedSlot.setItem(selectedItem);
    };
    pickupBowl = (block, player) => {
        this.pickup(block, player);
        SoundManager.playSound(BowlPickupSoundId, block.location);
    };
}
ComponentManager.registerBlockComponent("bcc.cook:bowl" /* BlockId.bowl */, new BowlCustomComponent());
