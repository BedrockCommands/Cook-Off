import { Player } from "@minecraft/server";
import PlayerInventory from "../../../PlayerInventory";
import { AdminToolRegistry } from "../adminTools";
import { BlockDataManager } from "../../../blockData/blockDataManager";
import { ModalFormData } from "@minecraft/server-ui";
import Utils from "../../../Utils";

const ToolName = "Get Item Block Data";

AdminToolRegistry.registerTool(ToolName, getSelectedItemBlockData);
function getSelectedItemBlockData(player: Player) {
	const inputForm = new ModalFormData()
		.title(ToolName)
		.slider("Slot", 1, 9);
	
	inputForm.show(player).then((response) => {
		if (response.formValues === undefined) return;
		const slotIndex = (response.formValues[0] as number) - 1;
		const inventory = new PlayerInventory(player);
		const itemStack = inventory.getItem(slotIndex);
		if (itemStack === undefined) {
			Utils.showTextDisplayForm(ToolName, "There is no item in that slot.", player);
			return;
		}
		const blockData = BlockDataManager.getBlockDataFromItemStack(itemStack);
		Utils.showTextDisplayForm(ToolName, JSON.stringify(blockData) ?? "No block data.", player);
	});

	// const inventory = new PlayerInventory(player);
	// const selectedItem = inventory.getSelectedItem();
	// if (!selectedItem) {
	// 	console.warn("No item selected.");
	// 	return;
	// }
	// const blockData = BlockDataManager.getBlockDataFromItemStack(selectedItem);
	// console.warn(JSON.stringify(blockData));
}