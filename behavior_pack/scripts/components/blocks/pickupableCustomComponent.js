import { PlayerInventory } from "../../utils/playerInventory";
export class PickupableCustomComponent {
    onPlayerInteract = (event) => {
        const player = event.player;
        if (player === undefined)
            return;
        const block = event.block;
        this.pickup(block, player);
    };
    pickup = (block, player) => {
        // const blockItemStack = BlockDataManager.getItemFromBlockWithData(block); // In case the block has data associated with it
        const blockItemStack = block.getItemStack(); // Note that this does not save block data! Use PickupableBlockDataCustomComponent instead
        const inventory = new PlayerInventory(player);
        if (block.hasTag("bcc.cook:counter_placeable_in_adventure"))
            blockItemStack.setCanPlaceOn(["minecraft:stone"]); // Replace with bcc.cook:counter once created
        inventory.give(blockItemStack);
        block.setType("minecraft:air");
        // BlockDataManager.clearBlockData(block);
    };
}
