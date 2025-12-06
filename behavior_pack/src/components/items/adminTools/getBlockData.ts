import { ItemComponentUseEvent } from "@minecraft/server";
import { Vector } from "../../../Vector";
import { BlockDataManager } from "../../../blockData/blockDataManager";
import { showTextDisplayForm } from "../../../Utils";
import { ComponentManager } from "../../componentManager";
import { ItemId } from "../../../constants/itemId";

const ToolName = "Get Block Data";

ComponentManager.registerItemComponent(ItemId.getBlockData, {
	onUse: (event: ItemComponentUseEvent) => {
		const player = event.source;
		const raycastHit = player.getBlockFromViewDirection();
		if (raycastHit === undefined) {
			showTextDisplayForm(ToolName, "Not looking at a block.", player);
			return;
		}
		const block = raycastHit.block;
		const blockData = BlockDataManager.getBlockDataByLocation(Vector.from(block.location));
		showTextDisplayForm(ToolName, JSON.stringify(blockData) ?? "No block data.", player);
	}
});