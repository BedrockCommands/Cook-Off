// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit

import { ItemId } from "../../constants/itemId";
import { ComponentManager } from "../componentManager";

ComponentManager.registerItemComponent(ItemId.fireExtinguisher, {
    onUse: ({ source }) => {
        // TODO: implement fire-extinguishing capabilities
        source.sendMessage("You extinguished a fire!");
    },
});
