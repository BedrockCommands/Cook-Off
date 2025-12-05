import { Block, BlockComponentPlayerBreakEvent, BlockComponentPlayerPlaceBeforeEvent, BlockCustomComponent, BlockEvent } from "@minecraft/server";
import PlayerInventory from "../../PlayerInventory";
import { BlockData, BlockDataManager } from "../../blockData/blockDataManager";

export abstract class BlockDataCustomComponent<T extends BlockData> implements BlockCustomComponent {
	beforeOnPlayerPlace = (event: BlockComponentPlayerPlaceBeforeEvent) => {
		const player = event.player;
		if (player === undefined) return;
		const block = event.block;
		const inventory = new PlayerInventory(player);
		const blockItemStack = inventory.getSelectedItem();
		if (blockItemStack === undefined) return;
		const blockData = BlockDataManager.getBlockDataFromItemStack<T>(blockItemStack) ?? this.getDefaultBlockData();
		this.setBlockData(block, blockData);
	}

	onPlayerBreak = (event: BlockComponentPlayerBreakEvent) => {
		const block = event.block;
		this.clearBlockData(block);
	}

	getBlockData = (block: Block): T => {
		return BlockDataManager.getBlockData(block) ?? this.getDefaultBlockData();
	}

	setBlockData = (block: Block, data: T): void => {
		BlockDataManager.setBlockData(block, data);
	}

	clearBlockData = (block: Block): void => {
		BlockDataManager.clearBlockData(block);
	}

	abstract getDefaultBlockData(): T;
}