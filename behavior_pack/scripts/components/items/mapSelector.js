// SPDX-License-Identifier: MIT
// Copyright (c) @jeanmajid & Contributors
// Contributors: @jeanmajid
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit
import { ActionFormData } from "@minecraft/server-ui";
import { ComponentManager } from "../componentManager";
ComponentManager.registerItemComponent("bcc.cook:map_selector" /* ItemId.mapSelector */, {
    onUse: ({ source }) => {
        // TODO: call some ui
        const form = new ActionFormData();
        form.title("Map Selector");
        form.button("Map 1");
        form.button("Map 2");
        form.button("Map 3");
        form.show(source);
    },
});
