// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit
import Vector from "../Vector";
import { ItemStack, world } from "@minecraft/server";
const BlockDataDynamicPropertyId = "blockData";
export class BlockDataManager {
    static getItemFromBlockWithData(block) {
        const blockItemStack = new ItemStack(block.typeId);
        const blockData = BlockDataManager.getBlockData(block, {});
        blockItemStack.setDynamicProperty(BlockDataDynamicPropertyId, JSON.stringify(blockData));
        BlockDataManager.clearBlockData(block);
        return blockItemStack;
    }
    static getBlockDataFromItemStack(itemStack, defaultValue) {
        const blockDataRaw = itemStack.getDynamicProperty(BlockDataDynamicPropertyId);
        if (!blockDataRaw)
            return defaultValue; // returns undefined if no default value is provided
        return JSON.parse(blockDataRaw);
    }
    static setItemStackBlockData(itemStack, data) {
        const blockDataRaw = JSON.stringify(data);
        itemStack.setDynamicProperty(BlockDataDynamicPropertyId, blockDataRaw);
    }
    static getBlockData(block, defaultValue) {
        const blockLocation = Vector.from(block.location);
        return BlockDataManager.getBlockDataByLocation(blockLocation, defaultValue);
    }
    static getBlockDataByLocation(location, defaultValue) {
        const blockDataKey = BlockDataManager.getBlockDataKey(location);
        return BlockDataManager.getData(blockDataKey) ?? defaultValue; // If there is no block data at that location and no default value is provided, undefined is returned
    }
    static setBlockData(block, data) {
        const blockLocation = Vector.from(block);
        BlockDataManager.setBlockDataByLocation(blockLocation, data);
    }
    static setBlockDataByLocation(location, data) {
        const blockDataKey = BlockDataManager.getBlockDataKey(location);
        BlockDataManager.setData(blockDataKey, data);
    }
    static clearBlockData(block) {
        const blockLocation = Vector.from(block.location);
        BlockDataManager.clearBlockDataByLocation(blockLocation);
    }
    static clearBlockDataByLocation(location) {
        const blockDataKey = BlockDataManager.getBlockDataKey(location);
        BlockDataManager.setData(blockDataKey, undefined); // Clear the block data at that location
    }
    static getData(key) {
        const stringifiedData = world.getDynamicProperty(key);
        if (!stringifiedData)
            return undefined;
        return JSON.parse(stringifiedData);
    }
    static setData(key, data) {
        if (!data) {
            world.setDynamicProperty(key, undefined);
            return;
        }
        const stringifiedData = JSON.stringify(data);
        world.setDynamicProperty(key, stringifiedData);
    }
    static getBlockDataKey(location) {
        return `${BlockDataDynamicPropertyId}:${location.getCenter().toString()}`;
    }
}
