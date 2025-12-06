import { Block, BlockComponentPlayerInteractEvent, ContainerSlot, Player } from "@minecraft/server";
import { getDefaultPotBlockData, PotBlockData } from "../../blockData/pot";
import { BlockId } from "../../constants/blockId";
import { ComponentManager } from "../componentManager";
import { PickupableBlockDataCustomComponent } from "./pickupableBlockDataCustomComponent";
import SoundManager from "../../SoundManager";
import PlayerInventory from "../../PlayerInventory";

const PotPickupSoundId = "block.decorated_pot.insert";

class PotCustomComponent extends PickupableBlockDataCustomComponent<PotBlockData> {
	getDefaultBlockData = (): PotBlockData => {
		return getDefaultPotBlockData();
	}

	onPlayerInteract = (event: BlockComponentPlayerInteractEvent): void => {
        const player = event.player;
		if (player === undefined) return;
		const block = event.block;
        const inventory = new PlayerInventory(player);
        const selectedSlot = inventory.getSelectedSlot();
        if (!selectedSlot.hasItem()) {
            this.pickupPot(block, player);
            return;
        }
        this.addSelectedItemToPot(block, selectedSlot);
    }

	pickupPot = (block: Block, player: Player): void => {
		this.pickup(block, player);
		SoundManager.playSound(PotPickupSoundId, block.location);
	}

	addSelectedItemToPot = (block: Block, selectedSlot: ContainerSlot): void => {
		const selectedItem = selectedSlot.getItem();
		if (selectedItem === undefined || !selectedItem.hasTag("bcc.cook:pot_ingredient")) return;
		const blockData = this.getBlockData(block);
		blockData.items.push(selectedItem.typeId);
		this.setBlockData(block, blockData);
		selectedSlot.setItem(undefined); // Clear slot
	}
}

ComponentManager.registerBlockComponent(BlockId.pot, new PotCustomComponent());