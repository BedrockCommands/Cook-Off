// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit
import { getOverworld } from "./Utils";
export class SoundManager {
    static playSound(soundId, location, soundOptions) {
        getOverworld().playSound(soundId, location, soundOptions);
    }
}
