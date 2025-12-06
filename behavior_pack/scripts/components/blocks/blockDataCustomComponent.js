import { PlayerInventory } from "../../utils/playerInventory";
import { BlockDataManager } from "../../blockData/blockDataManager";
export class BlockDataCustomComponent {
    beforeOnPlayerPlace = (event) => {
        const player = event.player;
        if (player === undefined)
            return;
        const block = event.block;
        const inventory = new PlayerInventory(player);
        const blockItemStack = inventory.getSelectedItem();
        if (blockItemStack === undefined)
            return;
        const blockData = this.getBlockDataFromItemStack(blockItemStack) ?? this.getDefaultBlockData();
        this.setBlockData(block, blockData);
    };
    onPlayerBreak = (event) => {
        const block = event.block;
        this.clearBlockData(block);
    };
    getBlockData = (block) => {
        return BlockDataManager.getBlockData(block) ?? this.getDefaultBlockData();
    };
    setBlockData = (block, data) => {
        BlockDataManager.setBlockData(block, data);
    };
    clearBlockData = (block) => {
        BlockDataManager.clearBlockData(block);
    };
    getBlockDataFromItemStack = (itemStack) => {
        return BlockDataManager.getBlockDataFromItemStack(itemStack);
    };
}
