import { ItemComponentUseEvent } from "@minecraft/server";
import { PlayerInventory } from "../../../PlayerInventory";
import { BlockDataManager } from "../../../blockData/blockDataManager";
import { ModalFormData } from "@minecraft/server-ui";
import { showTextDisplayForm } from "../../../Utils";
import { ComponentManager } from "../../componentManager";
import { ItemId } from "../../../constants/itemId";

const ToolName = "Get Item Block Data";

ComponentManager.registerItemComponent(ItemId.getItemBlockData, {
	onUse: (event: ItemComponentUseEvent) => {
		const player = event.source;
		const inputForm = new ModalFormData()
			.title(ToolName)
			.slider("Slot", 1, 9);
		
		inputForm.show(player).then((response) => {
			if (response.formValues === undefined) return;
			const slotIndex = (response.formValues[0] as number) - 1;
			const inventory = new PlayerInventory(player);
			const itemStack = inventory.getItem(slotIndex);
			if (itemStack === undefined) {
				showTextDisplayForm(ToolName, "There is no item in that slot.", player);
				return;
			}
			const blockData = BlockDataManager.getBlockDataFromItemStack(itemStack);
			showTextDisplayForm(ToolName, JSON.stringify(blockData) ?? "No block data.", player);
		});
	}
});