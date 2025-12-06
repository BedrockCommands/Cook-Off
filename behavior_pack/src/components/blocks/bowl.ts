import { Block, BlockComponentPlayerInteractEvent, Player } from "@minecraft/server";
import { BlockId } from "../../constants/blockId";
import { ComponentManager } from "../componentManager";
import { PlayerInventory } from "../../utils/playerInventory";
import { PickupableCustomComponent } from "./pickupableCustomComponent";
import { BlockDataManager } from "../../blockData/blockDataManager";
import { PotBlockData } from "../../blockData/pot";
import { SoundManager } from "../../utils/soundManager";

const BowlPickupSoundId = "block.decorated_pot.insert";

class BowlCustomComponent extends PickupableCustomComponent {
	onPlayerInteract = (event: BlockComponentPlayerInteractEvent) => {
		const player = event.player;
		if (player === undefined) return;
		const block = event.block;
		const inventory = new PlayerInventory(player);
		const selectedSlot = inventory.getSelectedSlot();
		const selectedItem = selectedSlot.getItem();

		if (selectedItem === undefined) {
			this.pickupBowl(block, player);
			return;
		}

		if (selectedItem.typeId !== BlockId.pot) return;

		let potBlockData = BlockDataManager.getBlockDataFromItemStack<PotBlockData>(selectedItem)!;
		// To do: implement recipies
		console.warn("You just put what was in the pot in the bowl! (use your imagination for now :])");
		potBlockData.items = [];
		BlockDataManager.setItemStackBlockData(selectedItem, potBlockData);
		selectedSlot.setItem(selectedItem);
	}

	pickupBowl = (block: Block, player: Player) => {
		this.pickup(block, player);
		SoundManager.playSound(BowlPickupSoundId, block.location);
	}
}

ComponentManager.registerBlockComponent(BlockId.bowl, new BowlCustomComponent());