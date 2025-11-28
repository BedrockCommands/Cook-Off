// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit
import Vector from "../Vector";
import { ItemStack, world } from "@minecraft/server";
const blockDataItemDynamicPropertyId = "blockData";
export class BlockDataManager {
    static getItemFromBlockWithData(block) {
        const blockItemStack = new ItemStack(block.typeId);
        const blockData = BlockDataManager.getBlockData(block, {});
        blockItemStack.setDynamicProperty(blockDataItemDynamicPropertyId, JSON.stringify(blockData));
        BlockDataManager.clearBlockData(block);
        return blockItemStack;
    }
    static getBlockDataFromItemStack(itemStack, defaultValue) {
        const blockDataRaw = itemStack.getDynamicProperty(blockDataItemDynamicPropertyId);
        if (!blockDataRaw)
            return defaultValue;
        return JSON.parse(blockDataRaw);
    }
    static setItemStackBlockData(itemStack, data) {
        const blockDataRaw = JSON.stringify(data);
        itemStack.setDynamicProperty(blockDataItemDynamicPropertyId, blockDataRaw);
    }
    static getBlockData(block, defaultValue) {
        const blockLocation = Vector.from(block.location);
        return BlockDataManager.getBlockDataByLocation(blockLocation, defaultValue);
    }
    static getBlockDataByLocation(location, defaultValue) {
        const blockDataKey = BlockDataManager.getBlockDataKey(location);
        const blockData = BlockDataManager.getAllBlockData()[blockDataKey] ?? defaultValue;
        return blockData;
    }
    static setBlockData(block, data) {
        const blockLocation = Vector.from(block);
        BlockDataManager.setBlockDataByLocation(blockLocation, data);
    }
    static setBlockDataByLocation(location, data) {
        const blockDataKey = BlockDataManager.getBlockDataKey(location);
        const allBlockData = BlockDataManager.getAllBlockData();
        allBlockData[blockDataKey] = data;
        BlockDataManager.setAllBlockData(allBlockData);
    }
    static clearBlockData(block) {
        const blockLocation = Vector.from(block.location);
        BlockDataManager.clearBlockDataByLocation(blockLocation);
    }
    static clearBlockDataByLocation(location) {
        const blockDataKey = BlockDataManager.getBlockDataKey(location);
        const allBlockData = BlockDataManager.getAllBlockData();
        delete allBlockData[blockDataKey];
        BlockDataManager.setAllBlockData(allBlockData);
    }
    static getAllBlockData() {
        let allBlockDataUnparsed = world.getDynamicProperty("allBlockData");
        if (!allBlockDataUnparsed) {
            allBlockDataUnparsed = "{}";
            world.setDynamicProperty("allBlockData", allBlockDataUnparsed);
            return {};
        }
        return JSON.parse(allBlockDataUnparsed);
    }
    static setAllBlockData(allBlockData) {
        world.setDynamicProperty("allBlockData", JSON.stringify(allBlockData));
    }
    static getBlockDataKey(location) {
        return location.getCenter().toString();
    }
}
