import { Block, BlockComponentPlayerInteractEvent, Player } from "@minecraft/server";
import { BlockData, BlockDataManager } from "../../blockData/blockDataManager";
import { BlockDataCustomComponent } from "./blockDataCustomComponent";
import { IPickupableCustomComponent } from "./pickupableCustomComponent";
import { PlayerInventory } from "../../utils/playerInventory";

export abstract class PickupableBlockDataCustomComponent<T extends BlockData> extends BlockDataCustomComponent<T> implements IPickupableCustomComponent {
	onPlayerInteract = (event: BlockComponentPlayerInteractEvent) => {
		const player = event.player;
		if (player === undefined) return;
		const block = event.block;
		this.pickup(block, player);
	}

	pickup = (block: Block, player: Player): void => {
		const blockItemStack = BlockDataManager.getItemFromBlockWithData(block);
		const inventory = new PlayerInventory(player);
		if (block.hasTag("bcc.cook:counter_placeable_in_adventure"))
			blockItemStack.setCanPlaceOn([ "minecraft:stone" ]); // Replace with bcc.cook:counter once created
		inventory.give(blockItemStack);
		block.setType("minecraft:air");
		this.clearBlockData(block);
	}
}