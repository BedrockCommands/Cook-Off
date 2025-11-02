// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit
import Utils from "./Utils";
export default class SoundManager {
    static playSound(soundId, location, soundOptions) {
        Utils.getOverworld().playSound(soundId, location, soundOptions);
    }
}
