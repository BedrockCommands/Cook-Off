import Vector from "./Vector";
import { world } from "@minecraft/server";

export default class BlockDataManager {
	static getBlockData(location: Vector): Object | undefined {
		let blockDataKey = BlockDataManager.getBlockDataKey(location);
		let blockData = BlockDataManager.getAllBlockData()[blockDataKey];
		return blockData;
	}

	static setBlockData(location: Vector, data: Object): void {
		let blockDataKey = BlockDataManager.getBlockDataKey(location);
		let allBlockData = BlockDataManager.getAllBlockData();
		allBlockData[blockDataKey] = data;
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
type AllBlockData = Record<BlockDataKey, Object>;