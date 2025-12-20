// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit
import { ComponentManager } from "../componentManager";
ComponentManager.registerItemComponent("bcc.cook:fire_extinguisher" /* ItemId.fireExtinguisher */, {
    onCompleteUse: ({ source }) => {
        // TODO: implement fire-extinguishing capabilities
        source.sendMessage("You extinguished a fire!");
    }
});
