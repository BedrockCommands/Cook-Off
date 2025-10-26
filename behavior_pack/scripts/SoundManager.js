import Utils from "./Utils";
export default class SoundManager {
    static playSound(soundId, location, soundOptions) {
        Utils.getOverworld().playSound(soundId, location, soundOptions);
    }
}
