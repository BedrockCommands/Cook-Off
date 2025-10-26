import { world } from "@minecraft/server";
export default class Utils {
    static getOverworld() {
        return world.getDimension("minecraft:overworld");
    }
    static getAllPlayers() {
        return world.getAllPlayers();
    }
}
