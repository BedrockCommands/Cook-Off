// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09 @jeanmajid
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit

import { Block, BlockComponentPlayerInteractEvent, ContainerSlot, Player } from "@minecraft/server";
import { ComponentManager } from "../componentManager";
import { PlayerInventory } from "../../utils/playerInventory";
import { SoundManager } from "../../utils/soundManager";
import { BlockId } from "../../constants/blockId";
import { FryingPanBlockData, getDefaultFryingPanBlockData } from "../../blockData/fryingPan";
import { PickupableBlockDataCustomComponent } from "./pickupableBlockDataCustomComponent";

const FryingPanPickupSoundId = "block.decorated_pot.insert";

class FryingPanCustomComponent extends PickupableBlockDataCustomComponent<FryingPanBlockData> {
	getDefaultBlockData = (): FryingPanBlockData => {
		return getDefaultFryingPanBlockData();
	}

	onPlayerInteract = (event: BlockComponentPlayerInteractEvent) => {
        const player = event.player;
		if (player === undefined) return;
		const block = event.block;
        const inventory = new PlayerInventory(player);
        const selectedSlot = inventory.getSelectedSlot();
        if (!selectedSlot.hasItem()) {
            this.pickupFryingPan(block, player);
            return;
        }
        this.addSelectedItemToFryingPan(block, selectedSlot);
    }

	pickupFryingPan = (block: Block, player: Player) => {
		this.pickup(block, player);
		SoundManager.playSound(FryingPanPickupSoundId, block.location);
	}

	addSelectedItemToFryingPan = (block: Block, selectedSlot: ContainerSlot) => {
		const selectedItem = selectedSlot.getItem();
		if (selectedItem === undefined || !selectedItem.hasTag("bcc.cook:fryable")) return;
		const blockData = this.getBlockData(block);
		blockData.items.push(selectedItem.typeId);
		this.setBlockData(block, blockData);
		selectedSlot.setItem(undefined); // Clear slot
	}
}

ComponentManager.registerBlockComponent(BlockId.fryingPan, new FryingPanCustomComponent());