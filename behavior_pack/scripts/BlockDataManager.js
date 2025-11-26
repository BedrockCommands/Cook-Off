import { world } from "@minecraft/server";
export default class BlockDataManager {
    static getBlockData(location) {
        let blockDataKey = BlockDataManager.getBlockDataKey(location);
        let blockData = BlockDataManager.getAllBlockData()[blockDataKey];
        return blockData;
    }
    static setBlockData(location, data) {
        let blockDataKey = BlockDataManager.getBlockDataKey(location);
        let allBlockData = BlockDataManager.getAllBlockData();
        allBlockData[blockDataKey] = data;
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
