// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit

import { Vector3, WorldSoundOptions } from "@minecraft/server";
import { Utils } from "./Utils";

export class SoundManager {
	static playSound(soundId: string, location: Vector3, soundOptions?: WorldSoundOptions) {
		Utils.getOverworld().playSound(soundId, location, soundOptions);
	}
}