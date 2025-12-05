// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit

import Vector from "../Vector";
import { Block, ItemStack, world } from "@minecraft/server";

const BlockDataDynamicPropertyId = "blockData";

export class BlockDataManager {

	public static getItemFromBlockWithData(block: Block): ItemStack {
		const blockItemStack = new ItemStack(block.typeId);
		const blockData = BlockDataManager.getBlockData(block, {});
		blockItemStack.setDynamicProperty(BlockDataDynamicPropertyId, JSON.stringify(blockData));
		BlockDataManager.clearBlockData(block);
		return blockItemStack;
	}

	public static getBlockDataFromItemStack<BlockDataReturnType extends BlockData = BlockData>(itemStack: ItemStack, defaultValue?: BlockDataReturnType): BlockDataReturnType | undefined {
		const blockDataRaw = itemStack.getDynamicProperty(BlockDataDynamicPropertyId) as string;
		if (!blockDataRaw) return defaultValue; // returns undefined if no default value is provided
		return JSON.parse(blockDataRaw);
	}

	public static setItemStackBlockData(itemStack: ItemStack, data: BlockData): void {
		const blockDataRaw = JSON.stringify(data);
		itemStack.setDynamicProperty(BlockDataDynamicPropertyId, blockDataRaw);
	}

	public static getBlockData<BlockDataReturnType extends BlockData = BlockData>(block: Block, defaultValue?: BlockDataReturnType): BlockDataReturnType | undefined {
		const blockLocation = Vector.from(block.location);
		return BlockDataManager.getBlockDataByLocation(blockLocation, defaultValue);
	}

	public static getBlockDataByLocation<BlockDataReturnType extends BlockData = BlockData>(location: Vector, defaultValue?: BlockDataReturnType): BlockDataReturnType | undefined {
		const blockDataKey = BlockDataManager.getBlockDataKey(location);
		return BlockDataManager.getData(blockDataKey) as BlockDataReturnType ?? defaultValue; // If there is no block data at that location and no default value is provided, undefined is returned
	}

	public static setBlockData(block: Block, data?: BlockData): void {
		const blockLocation = Vector.from(block);
		BlockDataManager.setBlockDataByLocation(blockLocation, data);
	}

	public static setBlockDataByLocation(location: Vector, data?: BlockData): void {
		const blockDataKey = BlockDataManager.getBlockDataKey(location);
		BlockDataManager.setData(blockDataKey, data);
	}

	public static clearBlockData(block: Block): void {
		const blockLocation = Vector.from(block.location);
		BlockDataManager.clearBlockDataByLocation(blockLocation);
	}

	public static clearBlockDataByLocation(location: Vector): void {
		const blockDataKey = BlockDataManager.getBlockDataKey(location);
		BlockDataManager.setData(blockDataKey, undefined); // Clear the block data at that location
	}

	private static getData(key: BlockDataKey): BlockData | undefined {
		const stringifiedData = world.getDynamicProperty(key) as string | undefined;
		if (!stringifiedData) return undefined;
		return JSON.parse(stringifiedData) as BlockData;
	}

	private static setData(key: BlockDataKey, data?: BlockData) {
		if (!data) {
			world.setDynamicProperty(key, undefined);
			return;
		}
		const stringifiedData = JSON.stringify(data);
		world.setDynamicProperty(key, stringifiedData);
	}

	private static getBlockDataKey(location: Vector): BlockDataKey {
		return `${BlockDataDynamicPropertyId}:${location.getCenter().toString()}` as BlockDataKey;
	}
}

type BlockDataKey = string & { readonly __tag: "BlockDataKey" };

export type BlockData = Record<string, any>;