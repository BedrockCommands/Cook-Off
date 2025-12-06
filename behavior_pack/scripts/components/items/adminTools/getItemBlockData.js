import PlayerInventory from "../../../PlayerInventory";
import { BlockDataManager } from "../../../blockData/blockDataManager";
import { ModalFormData } from "@minecraft/server-ui";
import Utils from "../../../Utils";
import { ComponentManager } from "../../componentManager";
const ToolName = "Get Item Block Data";
ComponentManager.registerItemComponent("bcc.cook:get_item_block_data" /* ItemId.getItemBlockData */, {
    onUse: (event) => {
        const player = event.source;
        const inputForm = new ModalFormData()
            .title(ToolName)
            .slider("Slot", 1, 9);
        inputForm.show(player).then((response) => {
            if (response.formValues === undefined)
                return;
            const slotIndex = response.formValues[0] - 1;
            const inventory = new PlayerInventory(player);
            const itemStack = inventory.getItem(slotIndex);
            if (itemStack === undefined) {
                Utils.showTextDisplayForm(ToolName, "There is no item in that slot.", player);
                return;
            }
            const blockData = BlockDataManager.getBlockDataFromItemStack(itemStack);
            Utils.showTextDisplayForm(ToolName, JSON.stringify(blockData) ?? "No block data.", player);
        });
    }
});
