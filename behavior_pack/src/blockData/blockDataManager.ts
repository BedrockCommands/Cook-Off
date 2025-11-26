import Vector from "../Vector";
import { Block, ItemStack, world } from "@minecraft/server";

const blockDataItemDynamicPropertyId = "blockData";

export class BlockDataManager {
	public static getItemFromBlockWithData(block: Block): ItemStack {
		const blockItemStack = new ItemStack(block.typeId);
		const blockData = BlockDataManager.getBlockData(block, {});
		blockItemStack.setDynamicProperty(blockDataItemDynamicPropertyId, JSON.stringify(blockData));
		BlockDataManager.clearBlockData(block);
		return blockItemStack;
	}

	public static getBlockDataFromItemStack<BlockDataReturnType extends BlockData = BlockData>(itemStack: ItemStack, defaultValue: BlockDataReturnType): BlockDataReturnType {
		const blockDataRaw = itemStack.getDynamicProperty(blockDataItemDynamicPropertyId) as string;
		if (!blockDataRaw) return defaultValue;
		return JSON.parse(blockDataRaw);
	}

	public static setItemStackBlockData(itemStack: ItemStack, data: BlockData): void {
		const blockDataRaw = JSON.stringify(data);
		itemStack.setDynamicProperty(blockDataItemDynamicPropertyId, blockDataRaw);
	}

	public static getBlockData<BlockDataReturnType extends BlockData = BlockData>(block: Block, defaultValue: BlockDataReturnType): BlockDataReturnType {
		const blockLocation = Vector.from(block.location);
		return BlockDataManager.getBlockDataByLocation(blockLocation, defaultValue);
	}

	public static getBlockDataByLocation<BlockDataReturnType extends BlockData = BlockData>(location: Vector, defaultValue: BlockDataReturnType): BlockDataReturnType {
		const blockDataKey = BlockDataManager.getBlockDataKey(location);
		const blockData = BlockDataManager.getAllBlockData()[blockDataKey] ?? defaultValue;
		return blockData as BlockDataReturnType;
	}

	public static setBlockData(block: Block, data: BlockData): void {
		const blockLocation = Vector.from(block);
		BlockDataManager.setBlockDataByLocation(blockLocation, data);
	}

	public static setBlockDataByLocation(location: Vector, data: BlockData): void {
		const blockDataKey = BlockDataManager.getBlockDataKey(location);
		const allBlockData = BlockDataManager.getAllBlockData();
		allBlockData[blockDataKey] = data;
		BlockDataManager.setAllBlockData(allBlockData);
	}

	public static clearBlockData(block: Block): void {
		const blockLocation = Vector.from(block.location);
		BlockDataManager.clearBlockDataByLocation(blockLocation);
	}

	public static clearBlockDataByLocation(location: Vector): void {
		const blockDataKey = BlockDataManager.getBlockDataKey(location);
		const allBlockData = BlockDataManager.getAllBlockData();
		delete allBlockData[blockDataKey];
		BlockDataManager.setAllBlockData(allBlockData);
	}

	private static getAllBlockData(): AllBlockData {
		let allBlockDataUnparsed = world.getDynamicProperty("allBlockData") as string;
		if (!allBlockDataUnparsed) {
			allBlockDataUnparsed = "{}";
			world.setDynamicProperty("allBlockData", allBlockDataUnparsed);
			return {};
		}
		return JSON.parse(allBlockDataUnparsed);
	}

	private static setAllBlockData(allBlockData: AllBlockData): void {
		world.setDynamicProperty("allBlockData", JSON.stringify(allBlockData));
	}

	private static getBlockDataKey(location: Vector): BlockDataKey {
		return location.getCenter().toString();
	}
}

type BlockDataKey = string;
type AllBlockData = Record<BlockDataKey, BlockData>;

export interface BlockData {}