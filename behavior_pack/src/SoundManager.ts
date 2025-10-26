import { Vector3, WorldSoundOptions } from "@minecraft/server";
import Utils from "./Utils";

export default class SoundManager {
	static playSound(soundId: string, location: Vector3, soundOptions?: WorldSoundOptions) {
		Utils.getOverworld().playSound(soundId, location, soundOptions);
	}
}