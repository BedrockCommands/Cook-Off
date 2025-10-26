import { Dimension, world, Player } from "@minecraft/server";

export default class Utils {
	static getOverworld(): Dimension {
		return world.getDimension("minecraft:overworld");
	}

	static getAllPlayers(): Player[] {
		return world.getAllPlayers();
	}
}