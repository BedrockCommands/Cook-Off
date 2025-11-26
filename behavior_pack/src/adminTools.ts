// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit

import { Player, system } from "@minecraft/server";
import Vector from "./Vector.js";
import { BlockDataManager } from "./blockData/blockDataManager.js";
import PlayerInventory from "./PlayerInventory.js";

type AdminTool = (player: Player, message: string) => void;
class AdminToolRegistry {
	private static registeredTools = {};

	public static registerTool(name: string, tool: AdminTool): void {
		if (this.registeredTools[name]) return;
		this.registeredTools[name] = tool;
	}

	public static getTool(name: string): AdminTool | undefined {
		return this.registeredTools[name];
	}
}

system.afterEvents.scriptEventReceive.subscribe(event => {
	const player = event.sourceEntity as Player;
	if (!player || player.typeId !== "minecraft:player" || !player.hasTag("bcc.cook:admin")) return;
	let adminTool = AdminToolRegistry.getTool(event.id);
	if (adminTool) adminTool(player, event.message);
});

function getBlockData(player: Player): void {
	const block = player.getBlockFromViewDirection().block;
	console.warn(JSON.stringify(BlockDataManager.getBlockDataByLocation(Vector.from(block.location), {})));
}
AdminToolRegistry.registerTool("bcc.cook:getBlockData", getBlockData);

function getSelectedItemBlockData(player: Player): void {
	const inventory = new PlayerInventory(player);
	const selectedItem = inventory.getSelectedItem();
	const blockDataRaw = selectedItem.getDynamicProperty("blockData") as string;
	console.warn(blockDataRaw);
}
AdminToolRegistry.registerTool("bcc.cook:getSelectedItemBlockData", getSelectedItemBlockData);