import { Player } from "@minecraft/server";
import { AdminToolRegistry } from "../adminTools";
import Vector from "../../../Vector";
import { BlockDataManager } from "../../../blockData/blockDataManager";
import Utils from "../../../Utils";

const ToolName = "Get Block Data";

AdminToolRegistry.registerTool(ToolName, getBlockData);

function getBlockData(player: Player) {
	const raycastHit = player.getBlockFromViewDirection();
	if (raycastHit === undefined) {
		Utils.showTextDisplayForm(ToolName, "Not looking at a block.", player);
		return;
	}
	const block = raycastHit.block;
	const blockData = BlockDataManager.getBlockDataByLocation(Vector.from(block.location));
	Utils.showTextDisplayForm(ToolName, JSON.stringify(blockData) ?? "No block data.", player);
}