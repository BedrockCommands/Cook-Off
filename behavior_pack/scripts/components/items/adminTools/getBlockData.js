import { Vector } from "../../../utils/vector";
import { BlockDataManager } from "../../../blockData/blockDataManager";
import { showTextDisplayForm } from "../../../utils/general";
import { ComponentManager } from "../../componentManager";
const ToolName = "Get Block Data";
ComponentManager.registerItemComponent("bcc.cook:get_block_data" /* ItemId.getBlockData */, {
    onUse: (event) => {
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
