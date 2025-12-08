import { BlockDataManager } from "../../blockData/blockDataManager";
import { BlockDataCustomComponent } from "./blockDataCustomComponent";
import { PlayerInventory } from "../../utils/playerInventory";
export class PickupableBlockDataCustomComponent extends BlockDataCustomComponent {
    onPlayerInteract = (event) => {
        const player = event.player;
        if (player === undefined)
            return;
        const block = event.block;
        this.pickup(block, player);
    };
    pickup = (block, player) => {
        const blockItemStack = BlockDataManager.getItemFromBlockWithData(block);
        const inventory = new PlayerInventory(player);
        if (block.hasTag("bcc.cook:counter_placeable_in_adventure"))
            blockItemStack.setCanPlaceOn(["minecraft:stone"]); // Replace with bcc.cook:counter once created
        inventory.give(blockItemStack);
        block.setType("minecraft:air");
        this.clearBlockData(block);
    };
}
